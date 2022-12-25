import {classes} from '@hivewire/ts-utils'
import React, {FC, useMemo} from 'react'

import {MosaicRenderableVertex} from './_types'

type Props = Readonly<{
  item: MosaicRenderableVertex
  onResize: (x: number, y: number) => void
  onOver: (vertex: MosaicRenderableVertex) => void
}>

export const MosaicVertex: FC<Props> = ({item, onResize, onOver}) => {
  return (
    <div
      className={classes('min-h-0 min-w-0 cursor-move z-1')}
      style={{
        gridColumnStart: item.columnStart,
        gridColumnEnd: item.columnEnd,
        gridRowStart: item.rowStart,
        gridRowEnd: item.rowEnd,
      }}
      onMouseDown={(ev) => onResize(ev.pageX, ev.pageY)}
      onMouseEnter={() => onOver(item)}
      onMouseLeave={() => onOver(null)}
    ></div>
  )
}
