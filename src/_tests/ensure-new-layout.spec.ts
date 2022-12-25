import {ensureNewLayout} from '../_utils/translate-legacy'

describe('Mosaic > ensureNewLayout()', () => {
  it('works with null', () => {
    expect(ensureNewLayout(null)).toEqual([])
  })
  it('works with new layout', () => {
    expect(ensureNewLayout([{id: 'abc'}])).toEqual([{id: 'abc'}])
  })
  it('works with old layout', () => {
    const oldLayout = {
      type: 'b',
      items: [
        {
          type: 'b',
          items: [
            {id: 'a', type: 't'},
            {id: 'b', type: 't'},
          ],
          direction: 'h',
          childSizes: [0.42, 0.58],
        },
        {
          type: 'b',
          items: [
            {id: 'c', type: 't'},
            {id: 'd', type: 't'},
          ],
          direction: 'h',
          childSizes: [0.47, 0.53],
        },
        {id: 'e', type: 't'},
      ],
      direction: 'v',
      childSizes: [0.37, 0.32, 0.3333333333333333],
    }
    const shouldBe = [
      {id: 'a', w: 0.42, h: 0.37, x: 0, y: 0},
      {id: 'b', w: 0.58, h: 0.37, x: 0.42, y: 0},
      {id: 'c', w: 0.47, h: 0.32, x: 0, y: 0.37},
      {id: 'd', w: 0.53, h: 0.32, x: 0.47, y: 0.37},
      {id: 'e', w: 1, h: 0.3333333333333333, x: 0, y: 0.69},
    ]
    expect(ensureNewLayout(oldLayout)).toEqual(shouldBe)
  })
  it('works with old layout no sizes', () => {
    const oldLayout = {
      type: 'b',
      items: [
        {
          type: 'b',
          items: [
            {id: 'a', type: 't'},
            {id: 'b', type: 't'},
          ],
          direction: 'h',
        },
        {
          type: 'b',
          items: [
            {id: 'c', type: 't'},
            {id: 'd', type: 't'},
          ],
          direction: 'h',
        },
      ],
      direction: 'v',
    }
    const shouldBe = [
      {id: 'a', w: 0.5, h: 0.5, x: 0, y: 0},
      {id: 'b', w: 0.5, h: 0.5, x: 0.5, y: 0},
      {id: 'c', w: 0.5, h: 0.5, x: 0, y: 0.5},
      {id: 'd', w: 0.5, h: 0.5, x: 0.5, y: 0.5},
    ]
    expect(ensureNewLayout(oldLayout)).toEqual(shouldBe)
  })
})
