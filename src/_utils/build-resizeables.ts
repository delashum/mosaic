import {range} from '@hivewire/ts-utils'

import {
  MosaicLayout,
  MosaicRenderableEdge,
  MosaicRenderableItem,
  MosaicRenderableResizers,
  MosaicRenderableVertex,
} from '../_types'

export const buildResizeables = (
  items: MosaicRenderableItem[],
  size: [number, number],
  layout: MosaicLayout
): Map<string, MosaicRenderableResizers> => {
  const map = new Map<string, MosaicRenderableResizers>()
  const idGrid = buildTempGrid(size, items)

  const touchingCurrent = new Set<string>()

  // find horizontal edges
  for (let i = 1; i < idGrid.length; i += 2) {
    let start: number
    for (let j = 0; j < idGrid[i].length; j++) {
      if (idGrid[i][j]) {
        if (start != null) {
          const newEdge = formEdge('h', touchingCurrent, i, [start, j - 2], layout)
          map.set(newEdge.id, newEdge)
          start = null
        }
      } else if (idGrid[i - 1][j] && idGrid[i + 1][j]) {
        touchingCurrent.add(`${idGrid[i - 1][j]}:-:bottom`)
        touchingCurrent.add(`${idGrid[i + 1][j]}:-:top`)
        if (start == null) start = j
      }
    }
    if (start != null) {
      const newEdge = formEdge('h', touchingCurrent, i, [start, idGrid[i].length - 1], layout)
      map.set(newEdge.id, newEdge)
      start = null
    }
  }

  // find vertical edges
  for (let j = 1; j < idGrid[0].length; j += 2) {
    let start: number
    for (let i = 0; i < idGrid.length; i++) {
      if (idGrid[i][j]) {
        if (start != null) {
          const newEdge = formEdge('v', touchingCurrent, j, [start, i - 2], layout)
          map.set(newEdge.id, newEdge)
          start = null
        }
      } else if (idGrid[i][j - 1] && idGrid[i][j + 1]) {
        touchingCurrent.add(`${idGrid[i][j - 1]}:-:right`)
        touchingCurrent.add(`${idGrid[i][j + 1]}:-:left`)
        if (start == null) start = i
      }
    }
    if (start != null) {
      const newEdge = formEdge('v', touchingCurrent, j, [start, idGrid.length - 1], layout)
      map.set(newEdge.id, newEdge)
      start = null
    }
  }

  // find vertices
  for (let i = 1; i < idGrid.length; i += 2) {
    for (let j = 1; j < idGrid[i].length; j += 2) {
      let numberOfTouchingSides = 0
      if (idGrid[i + 1][j]) numberOfTouchingSides++
      if (idGrid[i - 1][j]) numberOfTouchingSides++
      if (idGrid[i][j + 1]) numberOfTouchingSides++
      if (idGrid[i][j - 1]) numberOfTouchingSides++
      if (numberOfTouchingSides <= 1) {
        const newVertex = formVertex([i, j], map)
        map.set(newVertex.id, newVertex)
      }
    }
  }

  return map
}

const formEdge = (
  orientation: 'v' | 'h',
  edges: Set<string>,
  rowCol: number,
  range: [number, number],
  layout: MosaicLayout
): MosaicRenderableEdge => {
  const edgeMap = new Map<string, Set<string>>()
  let originX: number = null
  let originY: number = null

  for (const e of edges) {
    const [id, side] = e.split(':-:') // this doesn't work with all IDs
    if (!edgeMap.has(id)) edgeMap.set(id, new Set())
    edgeMap.get(id).add(side)
    if (orientation === 'v' && side === 'left') originX = layout.find((e) => e.id === id)?.x
    if (orientation === 'h' && side === 'top') originY = layout.find((e) => e.id === id)?.y
  }

  edges.clear()

  return {
    id: `${Array.from(edgeMap.keys()).join(':')}-${orientation}`,
    type: 'edge',
    orientation: orientation === 'v' ? 'vertical' : 'horizontal',
    edges: edgeMap as any,
    columnStart: orientation === 'v' ? rowCol + 1 : range[0] + 1,
    columnEnd: orientation === 'v' ? rowCol + 2 : range[1] + 2,
    rowStart: orientation === 'h' ? rowCol + 1 : range[0] + 1,
    rowEnd: orientation === 'h' ? rowCol + 2 : range[1] + 2,
    originX,
    originY,
    // TODO later v
    afterDirect: [],
    beforeDirect: [],
    afterAll: [],
    beforeAll: [],
  }
}

const formVertex = (
  position: [number, number],
  edges: Map<string, MosaicRenderableResizers>
): MosaicRenderableVertex => {
  let verticalEdge = '',
    horizontalEdge = '',
    originX = 0,
    originY = 0
  const x = position[1] + 1,
    y = position[0] + 1
  for (const [id, edge] of edges) {
    if (edge.type === 'vertex') continue
    const validRow = (y >= edge.rowStart && y <= edge.rowEnd) || edge.rowStart - 1 === y || edge.rowEnd === y
    const validColumn =
      (x >= edge.columnStart && x <= edge.columnEnd) || edge.columnStart - 1 === x || edge.columnEnd === x
    if (validRow && validColumn && edge.type === 'edge') {
      if (edge.orientation === 'horizontal') {
        horizontalEdge = id
        originY = edge.originY
      }

      if (edge.orientation === 'vertical') {
        verticalEdge = id
        originX = edge.originX
      }
    }
  }

  return {
    id: `${x},${y}-.`,
    type: 'vertex',
    columnStart: x,
    columnEnd: x + 1,
    rowStart: y,
    rowEnd: y + 1,
    originX,
    originY,
    verticalEdge,
    horizontalEdge,
  }
}

export const buildTempGrid = (size: [number, number], layout: MosaicRenderableItem[]) => {
  const grid: string[][] = []
  for (const i of range(size[0])) grid.push(range(size[1]).map(() => null))

  for (const item of layout) {
    for (let i = item.rowStart; i < item.rowEnd; i++)
      for (let j = item.columnStart; j < item.columnEnd; j++) grid[i - 1][j - 1] = item.id
  }
  return grid
}
