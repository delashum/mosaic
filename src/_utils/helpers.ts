import {MosaicRenderableEdge, MosaicRenderableResizers, ResizeSide} from '../_types'

export const reverseEdgeMap = (map: Map<string, Set<ResizeSide>>) => {
  const newMap = new Map<ResizeSide, Set<string>>()
  for (const [id, set] of map) {
    for (const side of set) {
      if (!newMap.has(side)) newMap.set(side, new Set())
      newMap.get(side).add(id)
    }
  }
  return newMap
}

export const mergeEdgeMaps = (...maps: Map<string, Set<ResizeSide>>[]) => {
  const mergedMap = new Map<string, Set<ResizeSide>>()
  for (const map of maps) {
    for (const [id, set] of map) {
      for (const side of set) {
        if (!mergedMap.has(id)) mergedMap.set(id, new Set())
        mergedMap.get(id).add(side)
      }
    }
  }
  return mergedMap
}

export const getEdgesFromResizer = (
  item: MosaicRenderableResizers,
  resizeables: Map<string, MosaicRenderableResizers>
) => {
  if (item.type === 'edge') return item.edges
  else
    return mergeEdgeMaps(
      (resizeables.get(item.horizontalEdge) as MosaicRenderableEdge).edges,
      (resizeables.get(item.verticalEdge) as MosaicRenderableEdge).edges
    )
}
