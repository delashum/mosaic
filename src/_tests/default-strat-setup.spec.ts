import {arrayGroupBy} from '@hivewire/ts-utils'

import {defaultStrat} from '../_utils/default-drop-strat'
import {getPoint} from './helpers'
import {
  robust1Layout,
  robust2Layout,
  simple3Layout,
  simpleVerticalLayout,
  simpleVerticalScrambledLayout,
  singleItemLayout,
  TEST_RECT,
} from './layouts'

describe('Mosaic > defaultStrat.setup()', () => {
  const {setup} = defaultStrat
  it('works with empty', () => {
    const setupData = setup(TEST_RECT, [])
    expect(setupData.points).toHaveLength(1)
    expect(setupData.points).toEqual([
      {x: 200, y: 150, adjustedLayout: [], numberAffected: 0, newItemPosition: {x: 0, y: 0, w: 1, h: 1}},
    ])
  })
  it('works with single item', () => {
    const setupData = setup(TEST_RECT, singleItemLayout)
    expect(setupData.points).toHaveLength(4)
    expect(setupData.points).toEqual([
      {
        x: 0,
        y: 150,
        numberAffected: 1,
        adjustedLayout: [{x: 0.5, y: 0, w: 0.5, h: 1, id: 'a'}],
        newItemPosition: {x: 0, y: 0, w: 0.5, h: 1},
      },
      {
        x: 400,
        y: 150,
        numberAffected: 1,
        adjustedLayout: [{x: 0, y: 0, w: 0.5, h: 1, id: 'a'}],
        newItemPosition: {x: 0.5, y: 0, w: 0.5, h: 1},
      },
      {
        x: 200,
        y: 0,
        numberAffected: 1,
        adjustedLayout: [{x: 0, y: 0.5, w: 1, h: 0.5, id: 'a'}],
        newItemPosition: {x: 0, y: 0, w: 1, h: 0.5},
      },
      {
        x: 200,
        y: 300,
        numberAffected: 1,
        adjustedLayout: [{x: 0, y: 0, w: 1, h: 0.5, id: 'a'}],
        newItemPosition: {x: 0, y: 0.5, w: 1, h: 0.5},
      },
    ])
  })
  it('works with items not in order', () => {
    const setupData = setup(TEST_RECT, simpleVerticalScrambledLayout)
    expect(setupData.points).toHaveLength(9)
    setupData.points.forEach((point) => {
      expect(point.adjustedLayout).toHaveLength(2)
    })
  })
  it('works with simple vertical split', () => {
    const setupData = setup(TEST_RECT, simpleVerticalLayout)
    expect(setupData.points).toHaveLength(9)
    setupData.points.forEach((point) => {
      expect(point.adjustedLayout).toHaveLength(2)
    })
  })
  it('works with simple 3', () => {
    const setupData = setup(TEST_RECT, simple3Layout)
    expect(setupData.points).toHaveLength(14)
    setupData.points.forEach((point) => {
      expect(point.adjustedLayout).toHaveLength(3)
    })
    expect(getPoint(setupData.points, 0, 150).newItemPosition).toEqual({x: 0, y: 0, w: 0.3333333333333333, h: 1})
    expect(getPoint(setupData.points, 200, 150).newItemPosition).toEqual({
      x: 0.3333333333333333,
      y: 0,
      w: 0.3333333333333333,
      h: 1,
    })
    expect(getPoint(setupData.points, 400, 150).newItemPosition).toEqual({
      x: 0.6666666666666666,
      y: 0,
      w: 0.3333333333333333,
      h: 1,
    })
    expect(getPoint(setupData.points, 200, 0).newItemPosition).toEqual({x: 0, y: 0, w: 1, h: 0.5})
    expect(getPoint(setupData.points, 200, 300).newItemPosition).toEqual({x: 0, y: 0.5, w: 1, h: 0.5})
    expect(getPoint(setupData.points, 100, 0).newItemPosition).toEqual({x: 0, y: 0, w: 0.5, h: 0.5})
    expect(getPoint(setupData.points, 100, 300).newItemPosition).toEqual({x: 0, y: 0.5, w: 0.5, h: 0.5})
    expect(getPoint(setupData.points, 300, 0).newItemPosition).toEqual({x: 0.5, y: 0, w: 0.5, h: 0.3333333333333333})
    expect(getPoint(setupData.points, 300, 150).newItemPosition).toEqual({
      x: 0.5,
      y: 0.3333333333333333,
      w: 0.5,
      h: 0.3333333333333333,
    })
    expect(getPoint(setupData.points, 300, 300).newItemPosition).toEqual({
      x: 0.5,
      y: 0.6666666666666666,
      w: 0.5,
      h: 0.3333333333333333,
    })
    expect(getPoint(setupData.points, 200, 75).newItemPosition).toEqual({x: 0.5, y: 0, w: 0.25, h: 0.5})
    expect(getPoint(setupData.points, 200, 225).newItemPosition).toEqual({x: 0.5, y: 0.5, w: 0.25, h: 0.5})
    expect(getPoint(setupData.points, 400, 75).newItemPosition).toEqual({x: 0.75, y: 0, w: 0.25, h: 0.5})
    expect(getPoint(setupData.points, 400, 225).newItemPosition).toEqual({x: 0.75, y: 0.5, w: 0.25, h: 0.5})
  })
  it('works with several nested', () => {
    const setupData = setup(TEST_RECT, robust1Layout)
    expect(setupData.points).toHaveLength(19)
    const numberAffected = arrayGroupBy(setupData.points, 'numberAffected')
    expect(numberAffected[1]).toHaveLength(8)
    expect(numberAffected[2]).toHaveLength(3)
    expect(numberAffected[3]).toHaveLength(3)
    expect(numberAffected[4]).toHaveLength(5)
    setupData.points.forEach((point) => {
      expect(point.adjustedLayout).toHaveLength(4)
    })
  })
  it('works with more robust', () => {
    const setupData = setup(TEST_RECT, robust2Layout)
    expect(setupData.points).toHaveLength(25)
    const numberAffected = arrayGroupBy(setupData.points, 'numberAffected')
    expect(numberAffected[1]).toHaveLength(10)
    expect(numberAffected[2]).toHaveLength(6)
    expect(numberAffected[3]).toHaveLength(3)
    expect(numberAffected[6]).toHaveLength(6)
    setupData.points.forEach((point) => {
      expect(point.adjustedLayout).toHaveLength(6)
    })
  })
})
