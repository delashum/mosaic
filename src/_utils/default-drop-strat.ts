import {arrayGroupBy, ensureArray} from '@hivewire/ts-utils'

import {
  MosaicDropStrategy,
  MosaicDropStrategyImplementation,
  MosaicDropStrategyRemove,
  MosaicDropStrategyResize,
  MosaicDropStrategySetup,
  MosaicLayout,
  MosaicLayoutItem,
  MosaicLayoutPosition,
} from '../_types'

type SetupPoint = {
  x: number
  y: number
  numberAffected: number
  adjustedLayout: MosaicLayout
  newItemPosition: {x: number; y: number; w: number; h: number}
}

type Strat1Setup = {
  points: SetupPoint[]
}

type LayoutGroup = {items: MosaicLayout; offset: {x: number; y: number}; size: {w: number; h: number}}

type LayoutGroups = {
  verticalGroups: LayoutGroup[]
  horizontalGroups: LayoutGroup[]
}

const defaultStratFn: MosaicDropStrategyImplementation<Strat1Setup> = (rect, position, toInsert, insertType, setup) => {
  const relativeCursor = [position[0] - rect.left, position[1] - rect.top]
  const {points} = setup
  const withDistance = points.map((point) => ({
    point,
    // distance: Math.sqrt(
    //   Math.pow(relativeCursor[0] - point.x, 2) + Math.pow(relativeCursor[1] - point.y, 2)
    // ),
    distance: Math.abs(relativeCursor[0] - point.x) + Math.abs(relativeCursor[1] - point.y),
  }))
  withDistance.sort((a, b) => a.distance - b.distance)
  const closest = withDistance[0]
  const newItem = {...closest.point.newItemPosition, id: toInsert, _type: insertType}
  return [[...closest.point.adjustedLayout, newItem], newItem]
}

const defaultStratSetup: MosaicDropStrategySetup<Strat1Setup> = (rect, layout) => {
  const points = findNestedPoints(layout).map((e) => ({...e, x: e.x * rect.width, y: e.y * rect.height}))
  return {points}
}

const defaultStratRemove: MosaicDropStrategyRemove = (layout, id) => {
  const newLayout = removeFromLayout(layout, id)
  return newLayout
}

const defaultStratResize: MosaicDropStrategyResize = (layout, deltas) => {
  const newLayout = applyResizeToLayout(layout, deltas)
  return newLayout
}

export const applyResizeToLayout = (
  items: MosaicLayoutItem[],
  deltas: Map<string, {x?: number; y?: number; w?: number; h?: number}>
) => {
  const newLayout: MosaicLayoutItem[] = []
  for (const item of items) {
    if (!deltas.has(item.id)) newLayout.push(item)
    else {
      const {x = 0, y = 0, w = 0, h = 0} = deltas.get(item.id)
      newLayout.push({
        ...item,
        x: item.x + x,
        y: item.y + y,
        w: item.w + w,
        h: item.h + h,
      })
    }
  }

  return newLayout
}

export const removeFromLayout = (
  items: MosaicLayoutItem[],
  id: string,
  ratio: {w: number; h: number} = {w: 1, h: 1},
  offset: {x: number; y: number} = {x: 0, y: 0},
  unAffectedItems: MosaicLayoutItem[] = []
) => {
  const beforeItems: MosaicLayoutItem[] = []
  const afterItems: MosaicLayoutItem[] = []
  let groupWithId: LayoutGroup
  let isFinal = false
  let foundGroup = false

  const {verticalGroups, horizontalGroups} = divideItemsByLines(items, ratio, offset)
  const groupToUse = verticalGroups.length > 1 ? 'v' : 'h'
  const finalGroup = groupToUse === 'v' ? verticalGroups : horizontalGroups

  for (const group of finalGroup) {
    if (group.items.some((e) => e.id === id)) {
      foundGroup = true
      groupWithId = group
      if (group.items.length === 1) isFinal = true
    } else {
      if (foundGroup) afterItems.push(...group.items)
      else beforeItems.push(...group.items)
    }
  }

  if (!isFinal)
    return removeFromLayout(groupWithId.items, id, groupWithId.size, groupWithId.offset, [
      ...unAffectedItems,
      ...beforeItems,
      ...afterItems,
    ])
  else {
    const sizeKey = groupToUse === 'h' ? 'w' : 'h'
    const offsetKey = groupToUse === 'h' ? 'x' : 'y'

    return [
      ...unAffectedItems,
      ...growItemsBefore(beforeItems, offsetKey, sizeKey, {...offset, ...ratio}, finalGroup.length - 1),
      ...growItemsAfter(afterItems, offsetKey, sizeKey, {...offset, ...ratio}, finalGroup.length - 1),
    ]
  }
}

export const findNestedPoints = (
  items: MosaicLayoutItem[],
  ratio: {w: number; h: number} = {w: 1, h: 1},
  offset: {x: number; y: number} = {x: 0, y: 0},
  parentItems: MosaicLayoutItem[] = []
): SetupPoint[] => {
  const points: SetupPoint[] = []
  if (items.length === 0) {
    addPoints(points, {
      numberAffected: 0,
      x: offset.x + ratio.w / 2,
      y: offset.y + ratio.h / 2,
      adjustedLayout: parentItems,
      newItemPosition: {x: offset.x, y: offset.y, w: ratio.w, h: ratio.h},
    })
  } else {
    const {verticalGroups, horizontalGroups} = divideItemsByLines(items, ratio, offset)

    const addGroupPoints = (groups: LayoutGroup[], offsetKey: 'x' | 'y', sizeKey: 'w' | 'h') => {
      const offsetAlt = offsetKey === 'x' ? 'y' : 'x'
      const sizeAlt = sizeKey === 'w' ? 'h' : 'w'
      let offsetTracker = 0
      for (let i = 0; i < groups.length + 1; i++) {
        const group = groups[i]
        const beforeGroups = groups.slice(0, i)
        const beforeItems = beforeGroups.flatMap((e) => e.items)
        const afterItems = groups.slice(i).flatMap((e) => e.items)
        const afterItemsNonInclusive = groups.slice(i + 1).flatMap((e) => e.items)
        const adjustedBefore = shrinkItemsBefore(beforeItems, offsetKey, sizeKey, {...ratio, ...offset}, groups.length)
        const adjustedAfter = shrinkItemsAfter(afterItems, offsetKey, sizeKey, {...ratio, ...offset}, groups.length)

        addPoints(points, {
          numberAffected: items.length,
          [offsetKey]: offset[offsetKey] + offsetTracker,
          [offsetAlt]: offset[offsetAlt] + ratio[sizeAlt] / 2,
          adjustedLayout: [...parentItems, ...adjustedBefore, ...adjustedAfter],
          newItemPosition: {
            [offsetKey]:
              offset[offsetKey] +
              beforeGroups.reduce((t, e) => e.size[sizeKey] + t, 0) * (groups.length / (groups.length + 1)),
            [offsetAlt]: offset[offsetAlt],
            [sizeKey]: ratio[sizeKey] / (groups.length + 1),
            [sizeAlt]: ratio[sizeAlt],
          },
        } as SetupPoint)
        offsetTracker += groups[i]?.size[sizeKey] ?? 0
        if (groups.length > 1 && group)
          addPoints(
            points,
            findNestedPoints(group.items, group.size, group.offset, [
              ...parentItems,
              ...beforeItems,
              ...afterItemsNonInclusive,
            ])
          )
      }
    }

    addGroupPoints(horizontalGroups, 'x', 'w')
    addGroupPoints(verticalGroups, 'y', 'h')
  }

  return points
}

const addPoints = (points: SetupPoint[], newPoint: SetupPoint | SetupPoint[]) => {
  const newPoints = ensureArray(newPoint)
  for (const p of newPoints) {
    const pointClone = {...p}
    const match = points.find((p) => p.x === pointClone.x && p.y === pointClone.y)
    if (!match) points.push(pointClone)
    else if (match.numberAffected < p.numberAffected) {
      const index = points.indexOf(match)
      points.splice(index, 1, pointClone)
    }
  }
}

export const divideItemsByLines = (
  layout: MosaicLayout,
  size: {w: number; h: number},
  offset: {x: number; y: number}
): LayoutGroups => {
  const findGroups = (directionKey: 'x' | 'y', sizeKey: 'w' | 'h'): LayoutGroup[] => {
    const offsetAlt = directionKey === 'x' ? 'y' : 'x'
    const sizeAlt = sizeKey === 'w' ? 'h' : 'w'
    const groupedByDirection = arrayGroupBy(layout, directionKey)
    const lines: number[] = []
    for (const key in groupedByDirection) {
      const totalSize = groupedByDirection[key].reduce((t, e) => t + e[sizeKey], 0)
      if (totalSize.toFixed(6) == size[sizeKey].toFixed(6)) lines.push(groupedByDirection[key][0][directionKey])
    }
    lines.sort()
    return lines.map((line, i) => {
      const items = layout.filter((item) => item[directionKey] >= line && item[directionKey] < (lines[i + 1] ?? 1))
      const _offset = {[directionKey]: line, [offsetAlt]: offset[offsetAlt]} as {x: number; y: number}
      const _size = {
        [sizeAlt]: (lines[i + 1] ?? size[sizeAlt] + offset[directionKey]) - line,
        [sizeKey]: size[sizeKey],
      } as {
        w: number
        h: number
      }
      return {items, size: _size, offset: _offset}
    })
  }

  return {
    verticalGroups: findGroups('y', 'w'),
    horizontalGroups: findGroups('x', 'h'),
  }
}

export const shrinkItemsAfter = (
  items: MosaicLayoutItem[],
  offsetKey: 'x' | 'y',
  sizeKey: 'w' | 'h',
  position: MosaicLayoutPosition,
  numGroups: number
) => {
  return items.map((item) => {
    const offset = item[offsetKey] + (1 / (numGroups + 1)) * (position[offsetKey] + position[sizeKey] - item[offsetKey])
    const size = item[sizeKey] * (numGroups / (numGroups + 1))

    return {
      ...item,
      [offsetKey]: offset,
      [sizeKey]: size,
    }
  })
}

export const shrinkItemsBefore = (
  items: MosaicLayoutItem[],
  offsetKey: 'x' | 'y',
  sizeKey: 'w' | 'h',
  position: MosaicLayoutPosition,
  numGroups: number
) => {
  return items.map((item, i) => {
    const offset = item[offsetKey] - (1 / (numGroups + 1)) * (item[offsetKey] - position[offsetKey])
    const size = item[sizeKey] * (numGroups / (numGroups + 1))

    return {
      ...item,
      [offsetKey]: offset,
      [sizeKey]: size,
    }
  })
}

export const growItemsAfter = (
  items: MosaicLayoutItem[],
  offsetKey: 'x' | 'y',
  sizeKey: 'w' | 'h',
  position: MosaicLayoutPosition,
  numGroups: number
) => {
  return items.map((item) => {
    const offset = item[offsetKey] - (1 / numGroups) * (position[offsetKey] + position[sizeKey] - item[offsetKey])
    const size = item[sizeKey] / (numGroups / (numGroups + 1))

    return {
      ...item,
      [offsetKey]: offset,
      [sizeKey]: size,
    }
  })
}

export const growItemsBefore = (
  items: MosaicLayoutItem[],
  offsetKey: 'x' | 'y',
  sizeKey: 'w' | 'h',
  position: MosaicLayoutPosition,
  numGroups: number
) => {
  return items.map((item, i) => {
    const offset = item[offsetKey] + (1 / numGroups) * (item[offsetKey] - position[offsetKey])
    const size = item[sizeKey] / (numGroups / (numGroups + 1))

    return {
      ...item,
      [offsetKey]: offset,
      [sizeKey]: size,
    }
  })
}

export const defaultStrat: MosaicDropStrategy<Strat1Setup> = {
  fn: defaultStratFn,
  setup: defaultStratSetup,
  remove: defaultStratRemove,
  resize: defaultStratResize,
}
