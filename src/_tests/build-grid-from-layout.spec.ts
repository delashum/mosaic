import {buildGridFromLayout} from '../_utils/build-grid'
import {
  offset3Layout,
  perfectSquareLayout,
  robust1Layout,
  robust2Layout,
  simpleHorizontalLayout,
  simpleVerticalLayout,
  singleItemLayout,
} from './layouts'

describe('Mosaic > buildGridFromLayout()', () => {
  it('buildGridFromLayout() with single item', () => {
    const {
      items,
      grid: {columns, rows},
    } = buildGridFromLayout(singleItemLayout, 10)
    expect(columns).toBe('1fr')
    expect(rows).toBe('1fr')
    expect(items).toHaveLength(1)
    expect(items[0]).toEqual({id: 'a', type: 'component', columnStart: 1, columnEnd: 2, rowStart: 1, rowEnd: 2})
  })

  it('buildGridFromLayout() with simple vertical', () => {
    const {
      items,
      grid: {columns, rows},
    } = buildGridFromLayout(simpleVerticalLayout, 10)
    expect(columns).toBe('1fr')
    expect(rows).toBe('0.5fr 10px 0.5fr')
    expect(items).toHaveLength(2)
    expect(items[0]).toEqual({id: 'a', type: 'component', columnStart: 1, columnEnd: 2, rowStart: 1, rowEnd: 2})
    expect(items[1]).toEqual({id: 'b', type: 'component', columnStart: 1, columnEnd: 2, rowStart: 3, rowEnd: 4})
  })

  it('buildGridFromLayout() with simple horizontal', () => {
    const {
      items,
      grid: {columns, rows},
    } = buildGridFromLayout(simpleHorizontalLayout, 10)
    expect(rows).toBe('1fr')
    expect(columns).toBe('0.5fr 10px 0.5fr')
    expect(items).toHaveLength(2)
    expect(items[0]).toEqual({id: 'a', type: 'component', columnStart: 1, columnEnd: 2, rowStart: 1, rowEnd: 2})
    expect(items[1]).toEqual({id: 'b', type: 'component', columnStart: 3, columnEnd: 4, rowStart: 1, rowEnd: 2})
  })

  it('buildGridFromLayout() with offset 3', () => {
    const {
      items,
      grid: {columns, rows},
    } = buildGridFromLayout(offset3Layout, 10)
    expect(rows).toBe('0.5fr 10px 0.5fr')
    expect(columns).toBe('0.5fr 10px 0.5fr')
    expect(items).toHaveLength(3)
    expect(items[0]).toEqual({id: 'a', type: 'component', columnStart: 1, columnEnd: 2, rowStart: 1, rowEnd: 2})
    expect(items[1]).toEqual({id: 'b', type: 'component', columnStart: 3, columnEnd: 4, rowStart: 1, rowEnd: 2})
    expect(items[2]).toEqual({id: 'c', type: 'component', columnStart: 1, columnEnd: 4, rowStart: 3, rowEnd: 4})
  })

  it('buildGridFromLayout() with perfect square', () => {
    const {
      items,
      grid: {columns, rows},
    } = buildGridFromLayout(perfectSquareLayout, 10)
    expect(rows).toBe('0.5fr 10px 0.5fr')
    expect(columns).toBe('0.5fr 10px 0.5fr')
    expect(items).toHaveLength(4)
    expect(items[0]).toEqual({id: 'a', type: 'component', columnStart: 1, columnEnd: 2, rowStart: 1, rowEnd: 2})
    expect(items[1]).toEqual({id: 'b', type: 'component', columnStart: 3, columnEnd: 4, rowStart: 1, rowEnd: 2})
    expect(items[2]).toEqual({id: 'c', type: 'component', columnStart: 1, columnEnd: 2, rowStart: 3, rowEnd: 4})
    expect(items[3]).toEqual({id: 'd', type: 'component', columnStart: 3, columnEnd: 4, rowStart: 3, rowEnd: 4})
  })

  it('buildGridFromLayout() with robust1', () => {
    const {
      items,
      grid: {columns, rows},
    } = buildGridFromLayout(robust1Layout, 10)
    expect(rows).toBe('0.5fr 10px 0.5fr')
    expect(columns).toBe('0.5fr 10px 0.25fr 10px 0.25fr')
    expect(items).toHaveLength(4)
    expect(items[0]).toEqual({id: 'a', type: 'component', columnStart: 1, columnEnd: 2, rowStart: 1, rowEnd: 4})
    expect(items[1]).toEqual({id: 'b', type: 'component', columnStart: 3, columnEnd: 4, rowStart: 1, rowEnd: 2})
    expect(items[2]).toEqual({id: 'c', type: 'component', columnStart: 5, columnEnd: 6, rowStart: 1, rowEnd: 2})
    expect(items[3]).toEqual({id: 'd', type: 'component', columnStart: 3, columnEnd: 6, rowStart: 3, rowEnd: 4})
  })

  it('buildGridFromLayout() with robust2', () => {
    const {
      items,
      grid: {columns, rows},
    } = buildGridFromLayout(robust2Layout, 10)
    expect(rows).toBe('0.5fr 10px 0.5fr')
    expect(columns).toBe(
      '0.3333333333333333fr 10px 0.3333333333333333fr 10px 0.16666666666666663fr 10px 0.16666666666666674fr'
    )
    expect(items).toHaveLength(6)
    expect(items[0]).toEqual({id: 'a', type: 'component', columnStart: 1, columnEnd: 2, rowStart: 1, rowEnd: 2})
    expect(items[1]).toEqual({id: 'b', type: 'component', columnStart: 1, columnEnd: 2, rowStart: 3, rowEnd: 4})
    expect(items[2]).toEqual({id: 'c', type: 'component', columnStart: 3, columnEnd: 4, rowStart: 1, rowEnd: 4})
    expect(items[3]).toEqual({id: 'd', type: 'component', columnStart: 5, columnEnd: 6, rowStart: 1, rowEnd: 2})
    expect(items[4]).toEqual({id: 'e', type: 'component', columnStart: 7, columnEnd: 8, rowStart: 1, rowEnd: 2})
    expect(items[5]).toEqual({id: 'f', type: 'component', columnStart: 5, columnEnd: 8, rowStart: 3, rowEnd: 4})
  })
})
