import {removeFromLayout} from '../_utils/default-drop-strat'
import {
  perfectSquareLayout,
  simple3Layout,
  simpleHorizontalLayout,
  simpleVerticalLayout,
  singleItemLayout,
} from './layouts'

describe('Mosaic > removeFromLayout()', () => {
  it('works with single item', () => {
    const newLayout = removeFromLayout(singleItemLayout, 'a')
    expect(newLayout).toEqual([])
  })

  it('works with simple vertical', () => {
    const newLayout = removeFromLayout(simpleVerticalLayout, 'b')
    expect(newLayout).toEqual(singleItemLayout)
  })
  it('works with simple horizontal', () => {
    const newLayout = removeFromLayout(simpleHorizontalLayout, 'b')
    expect(newLayout).toEqual(singleItemLayout)
  })
  it('works with simple 3', () => {
    const newLayout = removeFromLayout(simple3Layout, 'c')
    expect(newLayout).toEqual(simpleHorizontalLayout)
  })
  it('works with perfect square', () => {
    const newLayout = removeFromLayout(perfectSquareLayout, 'd')
    expect(newLayout).toEqual([
      {x: 0, y: 0, w: 0.5, h: 0.5, id: 'a'},
      {x: 0.5, y: 0, w: 0.5, h: 0.5, id: 'b'},
      {x: 0, y: 0.5, w: 1, h: 0.5, id: 'c'},
    ])
  })
})
