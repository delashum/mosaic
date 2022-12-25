import {classes} from '@hivewire/ts-utils'
import React, {FC, useMemo} from 'react'

import {MosaicRenderableEdge} from './_types'

type Props = Readonly<{
  item: MosaicRenderableEdge
  edgeState: 'hover' | 'active' | null
  onResize: (x: number, y: number) => void
}>

export const MosaicEdge: FC<Props> = ({item, edgeState, onResize}) => {
  return (
    <div
      className={classes(
        'min-h-0 min-w-0 z-0 p-2 group',
        item.orientation === 'horizontal' ? 'cursor-ns-resize' : 'cursor-ew-resize'
      )}
      style={{
        gridColumnStart: item.columnStart,
        gridColumnEnd: item.columnEnd,
        gridRowStart: item.rowStart,
        gridRowEnd: item.rowEnd,
      }}
      onMouseDown={(ev) => onResize(ev.pageX, ev.pageY)}
    >
      <div
        className={classes(
          'w-full h-full rounded-2 group-hover:bg-[pink] transition-colors',
          edgeState === 'hover' ? 'bg-[pink]' : edgeState === 'active' && 'bg-[red]'
        )}
      />
    </div>
  )
}
