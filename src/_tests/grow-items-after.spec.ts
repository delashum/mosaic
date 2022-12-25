import {growItemsAfter} from '../_utils/default-drop-strat'

describe('Mosaic > growItemsAfter()', () => {
  it('growItemsAfter() works with 1', () => {
    const items = growItemsAfter(
      [{id: 'a', x: 0.75, y: 0, w: 0.25, h: 0.5}],
      'x',
      'w',
      {x: 0.5, y: 0, w: 0.5, h: 0.5},
      1
    )
    expect(items).toEqual([{id: 'a', x: 0.5, y: 0, w: 0.5, h: 0.5}])
  })

  it('growItemsAfter() works with 2', () => {
    const items = growItemsAfter(
      [
        {
          id: 'a',
          x: 0.6666666666666666,
          y: 0,
          w: 0.16666666666666666,
          h: 0.5,
        },
        {
          id: 'b',
          x: 0.8333333333333334,
          y: 0,
          w: 0.16666666666666666,
          h: 0.5,
        },
      ],
      'x',
      'w',
      {x: 0.5, y: 0, w: 0.5, h: 0.5},
      2
    )
    expect(items).toEqual([
      {id: 'a', x: 0.49999999999999994, y: 0, w: 0.25, h: 0.5},
      {id: 'b', x: 0.75, y: 0, w: 0.25, h: 0.5},
    ])
  })

  it('growItemsAfter() works with 3', () => {
    const items = growItemsAfter(
      [
        {
          id: 'a',
          x: 0.5,
          y: 0.5,
          w: 0.5,
          h: 0.5,
        },
        {
          id: 'b',
          x: 0,
          y: 0.75,
          w: 0.5,
          h: 0.25,
        },
        {
          id: 'c',
          x: 0,
          y: 0.5,
          w: 0.5,
          h: 0.25,
        },
      ],
      'y',
      'h',
      {x: 0, y: 0, w: 1, h: 1},
      1
    )
    expect(items).toEqual([
      {x: 0.5, y: 0, w: 0.5, h: 1, id: 'a'},
      {x: 0, y: 0.5, w: 0.5, h: 0.5, id: 'b'},
      {y: 0, x: 0, h: 0.5, w: 0.5, id: 'c'},
    ])
  })
})
