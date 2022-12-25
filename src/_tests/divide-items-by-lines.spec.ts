import {divideItemsByLines} from '../_utils/default-drop-strat'
import {
  offsetVerticalLayout,
  perfectSquareLayout,
  robust2Layout,
  robust2ScrambledLayout,
  simpleHorizontalLayout,
  simpleHorizontalScrambledLayout,
  simpleVerticalLayout,
} from './layouts'

describe('Mosaic > divideItemsByLines()', () => {
  it('works with simple horizontal split', () => {
    const items = simpleHorizontalLayout
    const {verticalGroups, horizontalGroups} = divideItemsByLines(items, {w: 1, h: 1}, {x: 0, y: 0})
    expect(verticalGroups).toHaveLength(1)
    expect(horizontalGroups).toHaveLength(2)
    expect(horizontalGroups[0].items).toHaveLength(1)
    expect(horizontalGroups[0].size).toEqual({w: 0.5, h: 1})
    expect(horizontalGroups[0].offset).toEqual({x: 0, y: 0})
    expect(horizontalGroups[1].items).toHaveLength(1)
    expect(horizontalGroups[1].size).toEqual({w: 0.5, h: 1})
    expect(horizontalGroups[1].offset).toEqual({x: 0.5, y: 0})
  })

  it('works with simple horizontal split, but items are in wrong order', () => {
    const items = simpleHorizontalScrambledLayout
    const {verticalGroups, horizontalGroups} = divideItemsByLines(items, {w: 1, h: 1}, {x: 0, y: 0})
    expect(verticalGroups).toHaveLength(1)
    expect(horizontalGroups).toHaveLength(2)
    expect(horizontalGroups[0].items).toHaveLength(1)
    expect(horizontalGroups[0].size).toEqual({w: 0.5, h: 1})
    expect(horizontalGroups[0].offset).toEqual({x: 0, y: 0})
    expect(horizontalGroups[1].items).toHaveLength(1)
    expect(horizontalGroups[1].size).toEqual({w: 0.5, h: 1})
    expect(horizontalGroups[1].offset).toEqual({x: 0.5, y: 0})
  })

  it('works with simple vertical split', () => {
    const items = simpleVerticalLayout
    const {verticalGroups, horizontalGroups} = divideItemsByLines(items, {w: 1, h: 1}, {x: 0, y: 0})
    expect(verticalGroups).toHaveLength(2)
    expect(horizontalGroups).toHaveLength(1)
    expect(verticalGroups[0].items).toHaveLength(1)
    expect(verticalGroups[0].size).toEqual({w: 1, h: 0.5})
    expect(verticalGroups[0].offset).toEqual({x: 0, y: 0})
    expect(verticalGroups[1].items).toHaveLength(1)
    expect(verticalGroups[1].size).toEqual({w: 1, h: 0.5})
    expect(verticalGroups[1].offset).toEqual({x: 0, y: 0.5})
  })

  it('works with more robust split', () => {
    const items = robust2Layout
    const {verticalGroups, horizontalGroups} = divideItemsByLines(items, {w: 1, h: 1}, {x: 0, y: 0})
    expect(horizontalGroups).toHaveLength(3)
    expect(verticalGroups).toHaveLength(1)
    expect(horizontalGroups[0].items).toHaveLength(2)
    expect(horizontalGroups[0].size).toEqual({w: 0.3333333333333333, h: 1})
    expect(horizontalGroups[0].offset).toEqual({x: 0, y: 0})
    expect(horizontalGroups[1].items).toHaveLength(1)
    expect(horizontalGroups[1].size).toEqual({w: 0.3333333333333333, h: 1})
    expect(horizontalGroups[1].offset).toEqual({x: 0.3333333333333333, y: 0})
    expect(horizontalGroups[2].items).toHaveLength(3)
    expect(horizontalGroups[2].size).toEqual({w: 0.33333333333333337, h: 1})
    expect(horizontalGroups[2].offset).toEqual({x: 0.6666666666666666, y: 0})
  })

  it('works with more robust split, but items are in wrong order', () => {
    const items = robust2ScrambledLayout
    const {verticalGroups, horizontalGroups} = divideItemsByLines(items, {w: 1, h: 1}, {x: 0, y: 0})
    expect(horizontalGroups).toHaveLength(3)
    expect(verticalGroups).toHaveLength(1)
    expect(horizontalGroups[0].items).toHaveLength(2)
    expect(horizontalGroups[0].size).toEqual({w: 0.3333333333333333, h: 1})
    expect(horizontalGroups[0].offset).toEqual({x: 0, y: 0})
    expect(horizontalGroups[1].items).toHaveLength(1)
    expect(horizontalGroups[1].size).toEqual({w: 0.3333333333333333, h: 1})
    expect(horizontalGroups[1].offset).toEqual({x: 0.3333333333333333, y: 0})
    expect(horizontalGroups[2].items).toHaveLength(3)
    expect(horizontalGroups[2].size).toEqual({w: 0.33333333333333337, h: 1})
    expect(horizontalGroups[2].offset).toEqual({x: 0.6666666666666666, y: 0})
  })

  it('works with non-simple vertical sub split', () => {
    const items = offsetVerticalLayout
    const {verticalGroups, horizontalGroups} = divideItemsByLines(
      items,
      {w: 0.3333333333333333, h: 1},
      {x: 0.6666666666666666, y: 0}
    )
    expect(verticalGroups).toHaveLength(2)
    expect(horizontalGroups).toHaveLength(1)
    expect(verticalGroups[0].items).toHaveLength(2)
    expect(verticalGroups[0].size).toEqual({w: 0.3333333333333333, h: 0.5})
    expect(verticalGroups[0].offset).toEqual({x: 0.6666666666666666, y: 0})
    expect(verticalGroups[1].items).toHaveLength(1)
    expect(verticalGroups[1].size).toEqual({w: 0.3333333333333333, h: 0.5})
    expect(verticalGroups[1].offset).toEqual({x: 0.6666666666666666, y: 0.5})
  })

  it('works with perfect square', () => {
    const items = perfectSquareLayout
    const {verticalGroups, horizontalGroups} = divideItemsByLines(items, {w: 1, h: 1}, {x: 0, y: 0})
    expect(verticalGroups).toHaveLength(2)
    expect(horizontalGroups).toHaveLength(2)
    expect(horizontalGroups[0].items).toHaveLength(2)
    expect(horizontalGroups[0].size).toEqual({w: 0.5, h: 1})
    expect(horizontalGroups[0].offset).toEqual({x: 0, y: 0})
    expect(horizontalGroups[1].items).toHaveLength(2)
    expect(horizontalGroups[1].size).toEqual({w: 0.5, h: 1})
    expect(horizontalGroups[1].offset).toEqual({x: 0.5, y: 0})
    expect(verticalGroups[0].items).toHaveLength(2)
    expect(verticalGroups[0].size).toEqual({w: 1, h: 0.5})
    expect(verticalGroups[0].offset).toEqual({x: 0, y: 0})
    expect(verticalGroups[1].items).toHaveLength(2)
    expect(verticalGroups[1].size).toEqual({w: 1, h: 0.5})
    expect(verticalGroups[1].offset).toEqual({x: 0, y: 0.5})
  })
})
