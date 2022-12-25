import {useDraggable} from '@dnd-kit/core'
import {FC, memo, useEffect} from 'react'

import {mosaicIdentifier} from './_constants'
import {RenderComponentFn} from './_types'

type Props = Readonly<{
  id: string
  renderComponent: RenderComponentFn
  onDelete?: () => void
  onMove: (id: string) => void
}>

export const MosaicComponent: FC<Props> = memo(({id, onDelete, renderComponent, onMove}) => {
  const {listeners, isDragging, setNodeRef} = useDraggable({id, data: {__id: mosaicIdentifier}})

  useEffect(() => {
    if (!isDragging) return
    onMove(id)
  }, [isDragging])

  const containerProps = {
    ref: setNodeRef,
    ...listeners,
  }
  return renderComponent(id, {
    handle: containerProps,
    onDelete,
  })
})
