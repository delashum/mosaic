import {MosaicLayout, MosaicRenderableResizers} from '../_types'

export const getAllLines = (
  originId: string,
  allEdges: Map<string, MosaicRenderableResizers>,
  allItems: MosaicLayout
) => {
  const vertical = new Set<number>()
  const horizontal = new Set<number>()

  for (const [id, edge] of allEdges) {
    if (id === originId) continue
    if (edge.type === 'edge' && edge.orientation === 'vertical')
      for (const [key, sides] of edge.edges) if (sides.has('left')) vertical.add(allItems.find((i) => i.id === key).x)
    if (edge.type === 'edge' && edge.orientation === 'horizontal')
      for (const [key, sides] of edge.edges) if (sides.has('top')) horizontal.add(allItems.find((i) => i.id === key).y)
  }

  return {
    vertical,
    horizontal,
  }
}
