import {growItemsBefore} from '../_utils/default-drop-strat'

describe('Mosaic > growItemsBefore()', () => {
  it('growItemsBefore() works with 1', () => {
    const items = growItemsBefore(
      [{id: 'a', x: 0.5, y: 0, w: 0.25, h: 0.5}],
      'x',
      'w',
      {x: 0.5, y: 0, w: 0.5, h: 0.5},
      1
    )
    expect(items).toEqual([{id: 'a', x: 0.5, y: 0, w: 0.5, h: 0.5}])
  })

  it('growItemsBefore() works with 2', () => {
    const items = growItemsBefore(
      [
        {
          id: 'a',
          x: 0.5,
          y: 0,
          w: 0.16666666666666666,
          h: 0.5,
        },
        {
          id: 'b',
          x: 0.6666666666666666,
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
      {id: 'a', x: 0.5, y: 0, w: 0.25, h: 0.5},
      {id: 'b', x: 0.75, y: 0, w: 0.25, h: 0.5},
    ])
  })

  it('growItemsBefore() works with 3', () => {
    const items = growItemsBefore(
      [
        {
          id: 'a',
          x: 0.5,
          y: 0,
          w: 0.16666666666666666,
          h: 0.5,
        },
        {
          id: 'b',
          x: 0.6666666666666666,
          y: 0,
          w: 0.16666666666666666,
          h: 0.25,
        },
        {
          id: 'c',
          x: 0.6666666666666666,
          y: 0.25,
          w: 0.16666666666666666,
          h: 0.25,
        },
      ],
      'x',
      'w',
      {x: 0.5, y: 0, w: 0.5, h: 0.5},
      2
    )
    expect(items).toEqual([
      {id: 'a', x: 0.5, y: 0, w: 0.25, h: 0.5},
      {id: 'b', x: 0.75, y: 0, w: 0.25, h: 0.25},
      {id: 'c', x: 0.75, y: 0.25, w: 0.25, h: 0.25},
    ])
  })
})
