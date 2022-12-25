import {findNestedPoints} from '../_utils/default-drop-strat'
import {perfectSquareLayout} from './layouts'

const layout = [
  {x: 0.598962825826268, y: 0.5, w: 0.4010371741737319, h: 0.5, id: 'd'},
  {x: 0, y: 0.5, w: 0.598962825826268, h: 0.5, id: 'c'},
  {y: 0, x: 0.3815138956093661, h: 0.5, w: 0.6184861043906339, id: 'b'},
  {x: 0, y: 0, w: 0.3815138956093661, h: 0.5, id: 'a'},
]

describe('Mosaic > findNestedPoints()', () => {
  it('works with offset layout', () => {
    const points = findNestedPoints(layout)

    expect(points).toHaveLength(19)
  })

  it('works with perfect square', () => {
    const points = findNestedPoints(perfectSquareLayout)

    expect(points).toHaveLength(17)
  })
})
