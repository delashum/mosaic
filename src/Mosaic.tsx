import {DragOverlay, useDroppable} from '@dnd-kit/core'
import {classes, listenGlobalEvent} from '@hivewire/ts-utils'
import React, {FC, ReactElement, useEffect, useMemo, useRef, useState} from 'react'

import {HwComponentProps} from '../types'
import {
  defaultCanDrop,
  defaultConstraints,
  defaultDragOverlay,
  defaultMosaicComponent,
  defaultMosaicPlaceholder,
  mosaicIdentifier,
} from './_constants'
import {
  MosaicContainerRect,
  MosaicDropStrategy,
  MosaicItemConstraints,
  MosaicLayout,
  MosaicRenderableVertex,
  RenderComponentFn,
} from './_types'
import {buildGridFromLayout} from './_utils/build-grid'
import {buildResizeables} from './_utils/build-resizeables'
import {defaultStrat} from './_utils/default-drop-strat'
import {getAllLines} from './_utils/get-all-lines'
import {getEdgesFromResizer} from './_utils/helpers'
import {isValidLayout} from './_utils/is-valid-layout'
import {shiftLayout} from './_utils/shift-layout'
import {MosaicComponent} from './MosaicComponent'
import {MosaicEdge} from './MosaicEdge'
import {MosaicPlaceholder} from './MosaicPlaceholder'
import {MosaicVertex} from './MosaicVertex'

type Props = Readonly<{
  layout?: MosaicLayout
  dropStrategy?: MosaicDropStrategy
  gap?: number
  resizeDisabled?: boolean
  disabled?: boolean
  componentMinSize?: number
  elevateIdZIndex?: string
  resizeSnapTolerance?: number
  getConstraints?: (id: string) => MosaicItemConstraints
  dropTransform?: (id: string) => string
  canDrop?: (id: string) => boolean
  renderComponent?: RenderComponentFn
  renderPlaceholder?: (id: string) => ReactElement
  renderOverlay?: (id: string) => ReactElement
  onLayoutChange?: (newLayout: MosaicLayout) => void
}>

export const Mosaic: FC<Props & HwComponentProps> = ({
  'data-testid': dataTestId = 'hw-mosaic',
  layout = null,
  dropStrategy = defaultStrat,
  gap = 10,
  disabled = false,
  resizeDisabled = false,
  componentMinSize = 0.1,
  resizeSnapTolerance = 10,
  elevateIdZIndex,
  dropTransform,
  getConstraints = defaultConstraints,
  canDrop = defaultCanDrop,
  renderComponent = defaultMosaicComponent,
  renderPlaceholder = defaultMosaicPlaceholder,
  renderOverlay = defaultDragOverlay,
  onLayoutChange,
}) => {
  if (gap < 0) throw Error('[Mosaic] gap must be >= 0')
  if (componentMinSize >= 1 || componentMinSize <= 0)
    throw Error('[Mosaic] componentMinSize must be 0 < x < 1 (think of it as a percent)')
  if (resizeSnapTolerance < 0) throw Error('[Mosaic] resizeSnapTolerance must be >= 0')
  if (!isValidLayout(layout)) throw Error('[Mosaic] provided layout is invalid')
  const {fn, setup, remove, resize} = dropStrategy
  const {isOver, setNodeRef, active} = useDroppable({id: 'mosaic'})
  const [displayLayout, setDisplayLayout] = useState(layout)
  const [originLayout, setOriginLayout] = useState(layout)
  const [container, setContainer] = useState<HTMLDivElement>()
  const [containerRect, setContainerRect] = useState<MosaicContainerRect>()
  const [overVertex, setOverVertex] = useState<MosaicRenderableVertex>()
  const prevStateId = useRef<string>()
  const isDraggingExisting = useRef(false)
  const [draggingId, setDraggingId] = useState(null)

  useEffect(() => {
    setDisplayLayout(layout)
    setOriginLayout(layout)
  }, [layout])

  useEffect(() => {
    if (!container) return
    setContainerRect(container.getBoundingClientRect())
    const observer = new ResizeObserver(() => {
      setContainerRect(container.getBoundingClientRect())
    })
    observer.observe(container)
    return () => {
      observer.disconnect()
    }
  }, [container])

  const setupData = useMemo(() => {
    if (!containerRect) return null
    return setup(containerRect, originLayout)
  }, [originLayout, containerRect])

  const {items, grid} = useMemo(() => buildGridFromLayout(displayLayout, gap, getConstraints), [
    displayLayout,
    gap,
    getConstraints,
  ])

  const resizeables = useMemo(
    () => buildResizeables(items, [grid.rows.split(' ').length, grid.columns.split(' ').length], originLayout),
    [items, grid, originLayout]
  )

  const updateLayout = (newLayout: MosaicLayout) => {
    if (!isValidLayout(newLayout))
      return console.error(
        '[Mosaic] internal error: invalid layout generated. Please contact library author',
        newLayout
      )
    setDisplayLayout(newLayout)
    onLayoutChange(newLayout)
  }

  const insertItem = (position: [number, number], id: string) => {
    id = dropTransform?.(id) ?? id
    const [newLayout] = fn(containerRect, position, id, undefined, setupData)
    updateLayout(newLayout)
  }

  const removeItem = (id: string) => {
    const newLayout = remove(originLayout, id)
    setOriginLayout(newLayout)
    updateLayout(newLayout)
  }

  const startResize = (id: string, x: number, y: number) => {
    const item = resizeables.get(id)
    const edges = getEdgesFromResizer(item, resizeables)
    const xFactor = 1 / containerRect.width
    const yFactor = 1 / containerRect.height
    const xSnapFactor = resizeSnapTolerance / containerRect.width
    const ySnapFactor = resizeSnapTolerance / containerRect.height
    const originalLayout = originLayout
    const allLines = getAllLines(id, resizeables, originLayout)

    const cleanupMove = listenGlobalEvent('mousemove', (ev) => {
      ev.preventDefault()
      const newLayout = resize(
        originalLayout,
        shiftLayout(
          originLayout,
          edges,
          [(ev.pageX - x) * xFactor, (ev.pageY - y) * yFactor],
          allLines,
          xSnapFactor,
          ySnapFactor,
          item.originX,
          item.originY,
          componentMinSize
        )
      )
      setDisplayLayout(newLayout)
    })
    const cleanupUp = listenGlobalEvent('mouseup', (ev) => {
      const newLayout = resize(
        originalLayout,
        shiftLayout(
          originLayout,
          edges,
          [(ev.pageX - x) * xFactor, (ev.pageY - y) * yFactor],
          allLines,
          xSnapFactor,
          ySnapFactor,
          item.originX,
          item.originY,
          componentMinSize
        )
      )
      setOriginLayout(newLayout)
      updateLayout(newLayout)
      cleanupUp()
      cleanupMove()
    })
  }

  useEffect(() => {
    if (!isOver || draggingId) return
    if (active?.data.current?.__id !== mosaicIdentifier) return
    if (!canDrop(active.id)) return
    const moveCleanup = listenGlobalEvent('mousemove', (ev) => {
      const [newLayout, newItem] = fn(containerRect, [ev.pageX, ev.pageY], active.id, 'placeholder', setupData)
      const stateId = `${newItem.x},${newItem.y},${newItem.w},${newItem.h},`
      if (prevStateId.current !== stateId) {
        setDisplayLayout(newLayout)
        prevStateId.current = stateId
      }
    })
    const upCleanup = listenGlobalEvent('mouseup', (ev) => {
      insertItem([ev.pageX, ev.pageY], active.id)
      moveCleanup()
      upCleanup()
    })
    return () => {
      prevStateId.current = undefined
      setDisplayLayout(originLayout)
      moveCleanup()
      if (isOver)
        setTimeout(() => {
          upCleanup()
        })
    }
  }, [isOver, originLayout, active?.id, setupData])

  useEffect(() => {
    if (!draggingId) return
    if (active?.data.current?.__id !== mosaicIdentifier) return
    if (!canDrop(active.id)) return
    const moveCleanup = listenGlobalEvent('mousemove', (ev) => {
      const [newLayout, newItem] = fn(containerRect, [ev.pageX, ev.pageY], active.id, 'hidden', setupData)
      const stateId = `${newItem.x},${newItem.y},${newItem.w},${newItem.h},`
      if (prevStateId.current !== stateId) {
        setDisplayLayout(newLayout)
        prevStateId.current = stateId
      }
    })
    const upCleanup = listenGlobalEvent('mouseup', (ev) => {
      insertItem([ev.pageX, ev.pageY], draggingId)
      isDraggingExisting.current = false
      setDraggingId(null)
      prevStateId.current = undefined
    })
    return () => {
      moveCleanup()
      upCleanup()
    }
  }, [draggingId])

  return (
    <div
      data-testid={dataTestId}
      className={classes('flex-1 w-full h-full')}
      style={{
        display: 'grid',
        gridTemplateColumns: grid.columns,
        gridTemplateRows: grid.rows,
      }}
      ref={(el) => {
        setNodeRef(el)
        setContainer(el)
      }}
    >
      {items.map((e) => (
        <div
          className={classes('flex min-h-0 min-w-0', elevateIdZIndex === e.id ? 'z-3' : 'z-2')}
          key={e.id}
          style={{
            gridColumnStart: e.columnStart,
            gridColumnEnd: e.columnEnd,
            gridRowStart: e.rowStart,
            gridRowEnd: e.rowEnd,
            opacity: e.type === 'hidden' ? 0.5 : undefined,
          }}
        >
          {e.type === 'placeholder' ? (
            <MosaicPlaceholder id={e.id} renderPlaceholder={renderPlaceholder} />
          ) : (
            <MosaicComponent
              id={e.id}
              onDelete={() => removeItem(e.id)}
              renderComponent={renderComponent}
              onMove={(_id) => {
                setOriginLayout(remove(originLayout, active.id))
                setDraggingId(_id)
                isDraggingExisting.current = true
              }}
            />
          )}
        </div>
      ))}
      {!resizeDisabled &&
        !disabled &&
        Array.from(resizeables).map(([id, item]) => (
          <React.Fragment key={id}>
            {item.type === 'edge' && (
              <MosaicEdge
                edgeState={overVertex?.horizontalEdge === id || overVertex?.verticalEdge === id ? 'hover' : null}
                item={item}
                onResize={(x, y) => startResize(id, x, y)}
              />
            )}
            {item.type === 'vertex' && (
              <MosaicVertex item={item} onResize={(x, y) => startResize(id, x, y)} onOver={setOverVertex} />
            )}
          </React.Fragment>
        ))}
      {active?.id && isDraggingExisting.current && (
        <DragOverlay dropAnimation={null}>{renderOverlay(active.id)}</DragOverlay>
      )}
    </div>
  )
}
