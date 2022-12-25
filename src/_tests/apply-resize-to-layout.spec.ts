import {applyResizeToLayout} from '../_utils/default-drop-strat'
import {mapify} from './helpers'
import {simpleHorizontalLayout, simpleVerticalLayout, singleItemLayout} from './layouts'

describe('Mosaic > applyResizeToLayout()', () => {
  it('works with empty', () => {
    const fixedLayout = applyResizeToLayout([], mapify({x: 0.5}))
    expect(fixedLayout).toEqual([])
  })

  xit('throws error if invalid resize', () => {
    expect(() => applyResizeToLayout(singleItemLayout, mapify({a: {x: 0.5, w: 0.5}}))).toThrow()
    expect(() => applyResizeToLayout(simpleHorizontalLayout, mapify({b: {x: 0.75, w: 0.25}}))).toThrow()
    expect(() => applyResizeToLayout(simpleHorizontalLayout, mapify({a: {w: 1.1}}))).toThrow()
  })

  it('works with simpleVerticalLayout', () => {
    const fixedLayout = applyResizeToLayout(simpleVerticalLayout, mapify({a: {h: 0.25}, b: {y: 0.25, h: -0.25}}))
    expect(fixedLayout).toEqual([
      {x: 0, y: 0, w: 1, h: 0.75, id: 'a'},
      {x: 0, y: 0.75, w: 1, h: 0.25, id: 'b'},
    ])
  })

  it('works with simpleHorizontalLayout', () => {
    const fixedLayout = applyResizeToLayout(simpleHorizontalLayout, mapify({a: {w: -0.25}, b: {x: -0.25, w: 0.25}}))
    expect(fixedLayout).toEqual([
      {x: 0, y: 0, w: 0.25, h: 1, id: 'a'},
      {x: 0.25, y: 0, w: 0.75, h: 1, id: 'b'},
    ])
  })
})
