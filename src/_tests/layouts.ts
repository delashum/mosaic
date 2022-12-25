export const TEST_RECT = {
  width: 400,
  height: 300,
  left: 0,
  top: 0,
}

export const singleItemLayout = [{x: 0, y: 0, w: 1, h: 1, id: 'a'}]
export const simpleVerticalLayout = [
  {x: 0, y: 0, w: 1, h: 0.5, id: 'a'},
  {x: 0, y: 0.5, w: 1, h: 0.5, id: 'b'},
]
export const simpleVerticalScrambledLayout = [
  {x: 0, y: 0.5, w: 1, h: 0.5, id: 'b'},
  {x: 0, y: 0, w: 1, h: 0.5, id: 'a'},
]
export const simpleHorizontalLayout = [
  {x: 0, y: 0, w: 0.5, h: 1, id: 'a'},
  {x: 0.5, y: 0, w: 0.5, h: 1, id: 'b'},
]
export const simpleHorizontalScrambledLayout = [
  {x: 0.5, y: 0, w: 0.5, h: 1, id: 'b'},
  {x: 0, y: 0, w: 0.5, h: 1, id: 'a'},
]
export const offsetVerticalLayout = [
  {x: 0.6666666666666666, y: 0, w: 0.16666666666666666, h: 0.5, id: 'd'},
  {x: 0.8333333333333333, y: 0, w: 0.16666666666666666, h: 0.5, id: 'e'},
  {x: 0.6666666666666666, y: 0.5, w: 0.3333333333333333, h: 0.5, id: 'f'},
]
export const perfectSquareLayout = [
  {x: 0, y: 0, w: 0.5, h: 0.5, id: 'a'},
  {x: 0.5, y: 0, w: 0.5, h: 0.5, id: 'b'},
  {x: 0, y: 0.5, w: 0.5, h: 0.5, id: 'c'},
  {x: 0.5, y: 0.5, w: 0.5, h: 0.5, id: 'd'},
]
export const simple3Layout = [
  {x: 0, y: 0, w: 0.5, h: 1, id: 'a'},
  {x: 0.5, y: 0, w: 0.5, h: 0.5, id: 'b'},
  {x: 0.5, y: 0.5, w: 0.5, h: 0.5, id: 'c'},
]
export const offset3Layout = [
  {x: 0, y: 0, w: 0.5, h: 0.5, id: 'a'},
  {x: 0.5, y: 0, w: 0.5, h: 0.5, id: 'b'},
  {x: 0, y: 0.5, w: 1, h: 0.5, id: 'c'},
]
export const robust1Layout = [
  {id: 'a', x: 0, y: 0, w: 0.5, h: 1},
  {id: 'b', x: 0.5, y: 0, w: 0.25, h: 0.5},
  {id: 'c', x: 0.75, y: 0, w: 0.25, h: 0.5},
  {id: 'd', x: 0.5, y: 0.5, w: 0.5, h: 0.5},
]
export const robust2Layout = [
  {x: 0, y: 0, w: 0.3333333333333333, h: 0.5, id: 'a'},
  {x: 0, y: 0.5, w: 0.3333333333333333, h: 0.5, id: 'b'},
  {x: 0.3333333333333333, y: 0, w: 0.3333333333333333, h: 1, id: 'c'},
  {x: 0.6666666666666666, y: 0, w: 0.16666666666666666, h: 0.5, id: 'd'},
  {x: 0.8333333333333333, y: 0, w: 0.16666666666666666, h: 0.5, id: 'e'},
  {x: 0.6666666666666666, y: 0.5, w: 0.3333333333333333, h: 0.5, id: 'f'},
]
export const robust2ScrambledLayout = [
  {x: 0.6666666666666666, y: 0, w: 0.16666666666666666, h: 0.5, id: 'd'},
  {x: 0, y: 0.5, w: 0.3333333333333333, h: 0.5, id: 'b'},
  {x: 0.8333333333333333, y: 0, w: 0.16666666666666666, h: 0.5, id: 'e'},
  {x: 0, y: 0, w: 0.3333333333333333, h: 0.5, id: 'a'},
  {x: 0.6666666666666666, y: 0.5, w: 0.3333333333333333, h: 0.5, id: 'f'},
  {x: 0.3333333333333333, y: 0, w: 0.3333333333333333, h: 1, id: 'c'},
]
