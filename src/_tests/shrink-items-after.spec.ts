import {shrinkItemsAfter} from '../_utils/default-drop-strat'

describe('Mosaic > shrinkItemsAfter()', () => {
  it('shrinkItemsAfter() works with 1', () => {
    const items = shrinkItemsAfter(
      [{id: 'a', x: 0.5, y: 0, w: 0.5, h: 0.5}],
      'x',
      'w',
      {x: 0.5, y: 0, w: 0.5, h: 0.5},
      1
    )
    expect(items).toEqual([{id: 'a', x: 0.75, y: 0, w: 0.25, h: 0.5}])
  })

  it('shrinkItemsAfter() works with 2', () => {
    const items = shrinkItemsAfter(
      [
        {id: 'a', x: 0.5, y: 0, w: 0.25, h: 0.5},
        {id: 'b', x: 0.75, y: 0, w: 0.25, h: 0.5},
      ],
      'x',
      'w',
      {x: 0.5, y: 0, w: 0.5, h: 0.5},
      2
    )
    expect(items).toEqual([
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
    ])
  })

  it('shrinkItemsAfter() works with 3', () => {
    const items = shrinkItemsAfter(
      [
        {x: 0.5, y: 0, w: 0.5, h: 1, id: 'a'},
        {x: 0, y: 0.5, w: 0.5, h: 0.5, id: 'b'},
        {y: 0, x: 0, h: 0.5, w: 0.5, id: 'c'},
      ],
      'y',
      'h',
      {x: 0, y: 0, w: 1, h: 1},
      1
    )
    expect(items).toEqual([
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
    ])
  })
})
