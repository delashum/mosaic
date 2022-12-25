import {MosaicLayout} from '../_types'
import {buildGridFromLayout} from './build-grid'

export const isValidLayout = (layout: MosaicLayout) => {
  if (layout.length === 0) return true

  const ids = new Set()
  for (const item of layout) {
    if (ids.has(item.id)) return false
    ids.add(item.id)
  }

  const {grid, items} = buildGridFromLayout(layout, 0)
  const fullGridW = grid.rows.split(' ').length
  const fullGridH = grid.columns.split(' ').length
  const totalSize = fullGridW * fullGridH

  let talliedSize = 0
  for (const item of items) {
    if (item.columnStart >= item.columnEnd) return false
    if (item.rowStart >= item.rowEnd) return false
    talliedSize += (item.columnEnd - item.columnStart) * (item.rowEnd - item.rowStart)
  }
  if (talliedSize !== totalSize) return false

  return true
}
