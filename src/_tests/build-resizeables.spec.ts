import {buildGridFromLayout} from '../_utils/build-grid'
import {buildResizeables} from '../_utils/build-resizeables'
import {
  offset3Layout,
  perfectSquareLayout,
  robust1Layout,
  robust2Layout,
  simpleHorizontalLayout,
  simpleVerticalLayout,
  singleItemLayout,
} from './layouts'

describe('Mosaic > buildResizeables()', () => {
  it('buildResizeables() with single item', () => {
    const {items, grid} = buildGridFromLayout(singleItemLayout, 10)
    const resizeables = buildResizeables(
      items,
      [grid.rows.split(' ').length, grid.columns.split(' ').length],
      singleItemLayout
    )
    expect(resizeables.size).toBe(0)
  })

  it('buildResizeables() with simple vertical', () => {
    const {items, grid} = buildGridFromLayout(simpleVerticalLayout, 10)
    const resizeables = buildResizeables(
      items,
      [grid.rows.split(' ').length, grid.columns.split(' ').length],
      simpleVerticalLayout
    )
    expect(resizeables.size).toBe(1)
    expect(resizeables.get('a:b-h')).toEqual({
      id: 'a:b-h',
      type: 'edge',
      orientation: 'horizontal',
      rowStart: 2,
      columnStart: 1,
      rowEnd: 3,
      columnEnd: 2,
      edges: new Map([
        ['a', new Set(['bottom'])],
        ['b', new Set(['top'])],
      ]),
      originX: null,
      originY: 0.5,
      afterDirect: [],
      afterAll: [],
      beforeDirect: [],
      beforeAll: [],
    })
  })

  it('buildResizeables() with simple horizontal', () => {
    const {items, grid} = buildGridFromLayout(simpleHorizontalLayout, 10)
    const resizeables = buildResizeables(
      items,
      [grid.rows.split(' ').length, grid.columns.split(' ').length],
      simpleHorizontalLayout
    )
    expect(resizeables.size).toBe(1)
    expect(resizeables.get('a:b-v')).toEqual({
      id: 'a:b-v',
      type: 'edge',
      orientation: 'vertical',
      rowStart: 1,
      columnStart: 2,
      rowEnd: 2,
      columnEnd: 3,
      edges: new Map([
        ['a', new Set(['right'])],
        ['b', new Set(['left'])],
      ]),
      originX: 0.5,
      originY: null,
      afterDirect: [],
      afterAll: [],
      beforeDirect: [],
      beforeAll: [],
    })
  })

  it('buildResizeables() with offset3', () => {
    const {items, grid} = buildGridFromLayout(offset3Layout, 10)
    const resizeables = buildResizeables(
      items,
      [grid.rows.split(' ').length, grid.columns.split(' ').length],
      offset3Layout
    )
    expect(resizeables.size).toBe(3)
    expect(resizeables.get('a:c:b-h')).toEqual({
      id: 'a:c:b-h',
      type: 'edge',
      orientation: 'horizontal',
      rowStart: 2,
      columnStart: 1,
      rowEnd: 3,
      columnEnd: 4,
      edges: new Map([
        ['a', new Set(['bottom'])],
        ['c', new Set(['top'])],
        ['b', new Set(['bottom'])],
      ]),
      originX: null,
      originY: 0.5,
      afterDirect: [],
      afterAll: [],
      beforeDirect: [],
      beforeAll: [],
    })
    expect(resizeables.get('a:b-v')).toEqual({
      id: 'a:b-v',
      type: 'edge',
      orientation: 'vertical',
      rowStart: 1,
      columnStart: 2,
      rowEnd: 2,
      columnEnd: 3,
      edges: new Map([
        ['a', new Set(['right'])],
        ['b', new Set(['left'])],
      ]),
      originX: 0.5,
      originY: null,
      afterDirect: [],
      afterAll: [],
      beforeDirect: [],
      beforeAll: [],
    })
    expect(resizeables.get('2,2-.')).toEqual({
      id: '2,2-.',
      type: 'vertex',
      rowStart: 2,
      columnStart: 2,
      rowEnd: 3,
      columnEnd: 3,
      originX: 0.5,
      originY: 0.5,
      verticalEdge: 'a:b-v',
      horizontalEdge: 'a:c:b-h',
    })
  })

  it('buildResizeables() with perfect square', () => {
    const {items, grid} = buildGridFromLayout(perfectSquareLayout, 10)
    const resizeables = buildResizeables(
      items,
      [grid.rows.split(' ').length, grid.columns.split(' ').length],
      perfectSquareLayout
    )
    expect(resizeables.size).toBe(3)
    expect(resizeables.get('a:c:b:d-h')).toEqual({
      id: 'a:c:b:d-h',
      type: 'edge',
      orientation: 'horizontal',
      rowStart: 2,
      columnStart: 1,
      rowEnd: 3,
      columnEnd: 4,
      edges: new Map([
        ['a', new Set(['bottom'])],
        ['c', new Set(['top'])],
        ['b', new Set(['bottom'])],
        ['d', new Set(['top'])],
      ]),
      originX: null,
      originY: 0.5,
      afterDirect: [],
      afterAll: [],
      beforeDirect: [],
      beforeAll: [],
    })
    expect(resizeables.get('a:b:c:d-v')).toEqual({
      id: 'a:b:c:d-v',
      type: 'edge',
      orientation: 'vertical',
      rowStart: 1,
      columnStart: 2,
      rowEnd: 4,
      columnEnd: 3,
      edges: new Map([
        ['a', new Set(['right'])],
        ['b', new Set(['left'])],
        ['c', new Set(['right'])],
        ['d', new Set(['left'])],
      ]),
      originX: 0.5,
      originY: null,
      afterDirect: [],
      afterAll: [],
      beforeDirect: [],
      beforeAll: [],
    })
    expect(resizeables.get('2,2-.')).toEqual({
      id: '2,2-.',
      type: 'vertex',
      rowStart: 2,
      columnStart: 2,
      rowEnd: 3,
      columnEnd: 3,
      originX: 0.5,
      originY: 0.5,
      verticalEdge: 'a:b:c:d-v',
      horizontalEdge: 'a:c:b:d-h',
    })
  })

  it('buildResizeables() with robust1', () => {
    const {items, grid} = buildGridFromLayout(robust1Layout, 10)
    const resizeables = buildResizeables(
      items,
      [grid.rows.split(' ').length, grid.columns.split(' ').length],
      robust1Layout
    )
    expect(resizeables.size).toBe(5)
    expect(resizeables.get('b:d:c-h')).toEqual({
      id: 'b:d:c-h',
      type: 'edge',
      orientation: 'horizontal',
      rowStart: 2,
      columnStart: 3,
      rowEnd: 3,
      columnEnd: 6,
      edges: new Map([
        ['b', new Set(['bottom'])],
        ['d', new Set(['top'])],
        ['c', new Set(['bottom'])],
      ]),
      originX: null,
      originY: 0.5,
      afterDirect: [],
      afterAll: [],
      beforeDirect: [],
      beforeAll: [],
    })
    expect(resizeables.get('a:b:d-v')).toEqual({
      id: 'a:b:d-v',
      type: 'edge',
      orientation: 'vertical',
      rowStart: 1,
      columnStart: 2,
      rowEnd: 4,
      columnEnd: 3,
      edges: new Map([
        ['a', new Set(['right'])],
        ['b', new Set(['left'])],
        ['d', new Set(['left'])],
      ]),
      originX: 0.5,
      originY: null,
      afterDirect: [],
      afterAll: [],
      beforeDirect: [],
      beforeAll: [],
    })
    expect(resizeables.get('b:c-v')).toEqual({
      id: 'b:c-v',
      type: 'edge',
      orientation: 'vertical',
      rowStart: 1,
      columnStart: 4,
      rowEnd: 2,
      columnEnd: 5,
      edges: new Map([
        ['b', new Set(['right'])],
        ['c', new Set(['left'])],
      ]),
      originX: 0.75,
      originY: null,
      afterDirect: [],
      afterAll: [],
      beforeDirect: [],
      beforeAll: [],
    })
    expect(resizeables.get('2,2-.')).toEqual({
      id: '2,2-.',
      type: 'vertex',
      rowStart: 2,
      columnStart: 2,
      rowEnd: 3,
      columnEnd: 3,
      originX: 0.5,
      originY: 0.5,
      verticalEdge: 'a:b:d-v',
      horizontalEdge: 'b:d:c-h',
    })
    expect(resizeables.get('4,2-.')).toEqual({
      id: '4,2-.',
      type: 'vertex',
      rowStart: 2,
      columnStart: 4,
      rowEnd: 3,
      columnEnd: 5,
      originX: 0.75,
      originY: 0.5,
      verticalEdge: 'b:c-v',
      horizontalEdge: 'b:d:c-h',
    })
  })

  it('buildResizeables() with robust2', () => {
    const {items, grid} = buildGridFromLayout(robust2Layout, 10)
    const resizeables = buildResizeables(
      items,
      [grid.rows.split(' ').length, grid.columns.split(' ').length],
      robust2Layout
    )
    expect(resizeables.size).toBe(8)
    expect(resizeables.get('a:b-h')).toEqual({
      id: 'a:b-h',
      type: 'edge',
      orientation: 'horizontal',
      rowStart: 2,
      columnStart: 1,
      rowEnd: 3,
      columnEnd: 2,
      edges: new Map([
        ['a', new Set(['bottom'])],
        ['b', new Set(['top'])],
      ]),
      originX: null,
      originY: 0.5,
      afterDirect: [],
      afterAll: [],
      beforeDirect: [],
      beforeAll: [],
    })
    expect(resizeables.get('d:f:e-h')).toEqual({
      id: 'd:f:e-h',
      type: 'edge',
      orientation: 'horizontal',
      rowStart: 2,
      columnStart: 5,
      rowEnd: 3,
      columnEnd: 8,
      edges: new Map([
        ['d', new Set(['bottom'])],
        ['e', new Set(['bottom'])],
        ['f', new Set(['top'])],
      ]),
      originX: null,
      originY: 0.5,
      afterDirect: [],
      afterAll: [],
      beforeDirect: [],
      beforeAll: [],
    })
    expect(resizeables.get('a:c:b-v')).toEqual({
      id: 'a:c:b-v',
      type: 'edge',
      orientation: 'vertical',
      rowStart: 1,
      columnStart: 2,
      rowEnd: 4,
      columnEnd: 3,
      edges: new Map([
        ['a', new Set(['right'])],
        ['c', new Set(['left'])],
        ['b', new Set(['right'])],
      ]),
      originX: 0.3333333333333333,
      originY: null,
      afterDirect: [],
      afterAll: [],
      beforeDirect: [],
      beforeAll: [],
    })
    expect(resizeables.get('c:d:f-v')).toEqual({
      id: 'c:d:f-v',
      type: 'edge',
      orientation: 'vertical',
      rowStart: 1,
      columnStart: 4,
      rowEnd: 4,
      columnEnd: 5,
      edges: new Map([
        ['c', new Set(['right'])],
        ['d', new Set(['left'])],
        ['f', new Set(['left'])],
      ]),
      originX: 0.6666666666666666,
      originY: null,
      afterDirect: [],
      afterAll: [],
      beforeDirect: [],
      beforeAll: [],
    })
    expect(resizeables.get('d:e-v')).toEqual({
      id: 'd:e-v',
      type: 'edge',
      orientation: 'vertical',
      rowStart: 1,
      columnStart: 6,
      rowEnd: 2,
      columnEnd: 7,
      edges: new Map([
        ['d', new Set(['right'])],
        ['e', new Set(['left'])],
      ]),
      originX: 0.8333333333333333,
      originY: null,
      afterDirect: [],
      afterAll: [],
      beforeDirect: [],
      beforeAll: [],
    })
    expect(resizeables.get('2,2-.')).toEqual({
      id: '2,2-.',
      type: 'vertex',
      rowStart: 2,
      columnStart: 2,
      rowEnd: 3,
      columnEnd: 3,
      originX: 0.3333333333333333,
      originY: 0.5,
      verticalEdge: 'a:c:b-v',
      horizontalEdge: 'a:b-h',
    })
    expect(resizeables.get('4,2-.')).toEqual({
      id: '4,2-.',
      type: 'vertex',
      rowStart: 2,
      columnStart: 4,
      rowEnd: 3,
      columnEnd: 5,
      originX: 0.6666666666666666,
      originY: 0.5,
      verticalEdge: 'c:d:f-v',
      horizontalEdge: 'd:f:e-h',
    })
    expect(resizeables.get('6,2-.')).toEqual({
      id: '6,2-.',
      type: 'vertex',
      rowStart: 2,
      columnStart: 6,
      rowEnd: 3,
      columnEnd: 7,
      originX: 0.8333333333333333,
      originY: 0.5,
      verticalEdge: 'd:e-v',
      horizontalEdge: 'd:f:e-h',
    })
  })
})
