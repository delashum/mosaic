import {range} from '@hivewire/ts-utils'

import {LegacyMosaicLayout, MosaicLayout, MosaicLayoutItem} from '../_types'

export const ensureNewLayout = (value: any): MosaicLayout => {
  if (value == null) return []
  if (Array.isArray(value)) return value
  if (typeof value === 'object') return translateLegacyLayout(value)
  return []
}

export const translateLegacyLayout = (
  layout: LegacyMosaicLayout,
  items: MosaicLayoutItem[] = [],
  x = 0,
  y = 0,
  w = 1,
  h = 1
): MosaicLayout => {
  if (layout.type === 't') items.push({id: layout.id, w, h, y, x})
  else if (layout.type === 'b') {
    const itemSizes = layout.childSizes ?? range(layout.items.length).map(() => 1 / layout.items.length)
    const itemOffsets = itemSizes.reduce((arr, _, i, e) => [...arr, (arr[i - 1] ?? 0) + (e[i - 1] ?? 0)], [])
    for (let i = 0; i < layout.items.length; i++) {
      const item = layout.items[i]
      translateLegacyLayout(
        item,
        items,
        x + (layout.direction === 'h' ? itemOffsets[i] : 0),
        y + (layout.direction === 'v' ? itemOffsets[i] : 0),
        layout.direction === 'h' ? itemSizes[i] * w : w,
        layout.direction === 'v' ? itemSizes[i] * h : h
      )
    }
  }
  return items
}
