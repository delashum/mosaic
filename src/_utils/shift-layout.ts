import {boundNumber, isBetween} from '@hivewire/ts-utils'

import {EdgeMap, MosaicLayout} from '../_types'

export const shiftLayout = (
  layout: MosaicLayout,
  edgeMap: EdgeMap,
  deltas: [number, number],
  snapMarks: {
    vertical: Set<number>
    horizontal: Set<number>
  },
  xSnapFactor: number,
  ySnapFactor: number,
  originX: number,
  originY: number,
  minSize = 0
): Map<string, {x?: number; y?: number; w?: number; h?: number}> => {
  const boundsX = [-0.5, 0.5]
  const boundsY = [-0.5, 0.5]

  for (const item of layout) {
    if (!edgeMap.has(item.id)) continue
    const sides = edgeMap.get(item.id)
    if (sides.has('left')) boundsX[1] = Math.min(boundsX[1], item.w - minSize)
    if (sides.has('right')) boundsX[0] = Math.max(boundsX[0], minSize - item.w)
    if (sides.has('top')) boundsY[1] = Math.min(boundsY[1], item.h - minSize)
    if (sides.has('bottom')) boundsY[0] = Math.max(boundsY[0], minSize - item.h)
  }

  let moveX = boundNumber(deltas[0], ...boundsX)
  let moveY = boundNumber(deltas[1], ...boundsY)

  for (const v of snapMarks.vertical) {
    const relativeSnap = originX ? v - originX : v
    if (isBetween(moveX, relativeSnap - xSnapFactor, relativeSnap + xSnapFactor)) moveX = relativeSnap
  }
  for (const h of snapMarks.horizontal) {
    const relativeSnap = originY ? h - originY : h
    if (isBetween(moveY, relativeSnap - ySnapFactor, relativeSnap + ySnapFactor)) moveY = relativeSnap
  }

  const shiftMap = new Map()
  for (const item of layout) {
    if (!edgeMap.has(item.id)) continue
    const sides = edgeMap.get(item.id)
    const shifts = {
      x: sides.has('left') ? moveX : undefined,
      y: sides.has('top') ? moveY : undefined,
      w: sides.has('right') ? moveX : undefined,
      h: sides.has('bottom') ? moveY : undefined,
    }
    if (sides.has('left')) shifts.w = -moveX
    if (sides.has('top')) shifts.h = -moveY
    shiftMap.set(item.id, shifts)
  }

  return shiftMap
}
