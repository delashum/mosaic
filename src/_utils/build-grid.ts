import {distinct, sort} from '@hivewire/ts-utils'

import {defaultConstraints} from '../_constants'
import {MosaicItemConstraints, MosaicLayout, MosaicRenderableItem} from '../_types'

export const buildGridFromLayout = (
  layout: MosaicLayout,
  gutterSize: number,
  getConstraints: (id: string) => MosaicItemConstraints = defaultConstraints
): {items: MosaicRenderableItem[]; grid: {columns: string; rows: string}} => {
  const uniqueX = sort(distinct(layout.map((e) => e.x)))
  const gutterSlice = gutterSize ? -1 : undefined
  const columns = uniqueX
    .map((x, i) => (uniqueX[i + 1] ?? 1) - x)
    .map((n) => `${n}fr`)
    .flatMap((e) => {
      if (gutterSize) return [e, `${gutterSize}px`]
      else return [e]
    })
    .slice(0, gutterSlice)
    .join(' ')
  const uniqueY = sort(distinct(layout.map((e) => e.y)))
  const rows = uniqueY
    .map((y, i) => (uniqueY[i + 1] ?? 1) - y)
    .map((n) => `${n}fr`)
    .flatMap((e) => {
      if (gutterSize) return [e, `${gutterSize}px`]
      else return [e]
    })
    .slice(0, gutterSlice)
    .join(' ')

  const allX = [...uniqueX, 1].map((e) => e.toFixed(6))
  const allY = [...uniqueY, 1].map((e) => e.toFixed(6))

  const gutterMultiplier = gutterSize ? 2 : 1
  const gutterSumifier = gutterSize ? 0 : 1

  const gridItems: MosaicRenderableItem[] = layout.map((item) => {
    const constraints = getConstraints(item.id)
    const columnStart = allX.indexOf(item.x.toFixed(6)) * gutterMultiplier + 1
    const rowStart = allY.indexOf(item.y.toFixed(6)) * gutterMultiplier + 1
    const columnEnd = allX.indexOf((item.x + item.w).toFixed(6)) * gutterMultiplier + gutterSumifier
    const rowEnd = allY.indexOf((item.y + item.h).toFixed(6)) * gutterMultiplier + gutterSumifier

    return {
      id: item.id,
      type: item._type ?? 'component',
      columnStart: columnStart,
      columnEnd: columnEnd,
      rowStart: rowStart,
      rowEnd: rowEnd,
    }
  })

  return {items: gridItems, grid: {columns, rows}}
}
