import {isValidLayout} from '../_utils/is-valid-layout'
import {simpleHorizontalLayout, simpleVerticalLayout, singleItemLayout} from './layouts'

describe('Mosaic > isValidLayout()', () => {
  it('works with valid', () => {
    expect(isValidLayout([])).toBe(true)
    expect(isValidLayout(singleItemLayout)).toBe(true)
    expect(isValidLayout(simpleVerticalLayout)).toBe(true)
    expect(isValidLayout(simpleHorizontalLayout)).toBe(true)
  })

  it('catches invalid', () => {
    expect(isValidLayout([{x: 0, y: 0, w: 1, h: 0.5, id: 'a'}])).toBe(false)
    expect(
      isValidLayout([
        {x: 0, y: 0, w: 1, h: 1, id: 'a'},
        {x: 0, y: 0, w: 1, h: 1, id: 'b'},
      ])
    ).toBe(false)
  })
  expect(
    isValidLayout([
      {x: 0, y: 0, w: 1, h: 0.5, id: 'a'},
      {x: 0, y: 0.5, w: 1, h: 0.5, id: 'a'},
    ])
  ).toBe(false)
})
