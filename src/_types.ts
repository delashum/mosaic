import {ReactElement} from 'react'

export type LegacyMosaicLayout = LegacyMosaicItem
export type LegacyMosaicItem = LegacyMosaicContainerItem | LegacyMosaicComponentItem | LegacyMosaicPlaceholderItem
export interface LegacyMosaicContainerItem {
  type: 'b'
  direction: 'v' | 'h'
  items: LegacyMosaicItem[]
  childSizes?: number[]
}
export interface LegacyMosaicComponentItem {
  type: 't'
  id: string
}
export interface LegacyMosaicPlaceholderItem {
  type: 'p'
}

export type RenderableType = 'placeholder' | 'hidden' | 'component' | 'edge' | 'vertex'

export type MosaicLayoutPosition = {
  w: number
  h: number
  x: number
  y: number
}

export type MosaicContainerRect = {
  width: number
  height: number
  left: number
  top: number
}

export type MosaicLayoutItem = {
  id: string
  _type?: RenderableType
} & MosaicLayoutPosition

export type MosaicLayout = MosaicLayoutItem[]

type MosaicDropStrategyResponse = [MosaicLayout, MosaicLayoutItem]

export type MosaicDropStrategySetup<T = any> = (rect: MosaicContainerRect, layout: MosaicLayout) => T

export type MosaicDropStrategyRemove = (layout: MosaicLayout, id: string) => MosaicLayout
export type MosaicDropStrategyResize = (
  layout: MosaicLayout,
  deltas: Map<string, {x?: number; y?: number; w?: number; h?: number}>
) => MosaicLayout
export type MosaicDropStrategyImplementation<T = any> = (
  rect: MosaicContainerRect,
  position: [number, number],
  toInsert: string,
  insertType: RenderableType,
  setupData: T
) => MosaicDropStrategyResponse

export type MosaicRenderableItem = {
  id: string
  type: RenderableType
  columnStart: number
  columnEnd: number
  rowStart: number
  rowEnd: number
}

export type EdgeMap = Map<string, Set<ResizeSide>>

type MosaicResizeable = {
  originX: number
  originY: number
}

export type MosaicRenderableEdge = MosaicRenderableItem &
  MosaicResizeable & {
    type: 'edge'
    orientation: 'vertical' | 'horizontal'
    edges: EdgeMap
    afterDirect: string[]
    beforeDirect: string[]
    afterAll: string[]
    beforeAll: string[]
  }

export type MosaicRenderableVertex = MosaicRenderableItem &
  MosaicResizeable & {
    type: 'vertex'
    verticalEdge: string
    horizontalEdge: string
  }

export type MosaicRenderableResizers = MosaicRenderableEdge | MosaicRenderableVertex

export type MosaicDropStrategy<T = any> = {
  fn: MosaicDropStrategyImplementation<T>
  setup?: MosaicDropStrategySetup<T>
  remove: MosaicDropStrategyRemove
  resize: MosaicDropStrategyResize
}

export type MosaicItemConstraints = {
  minWidth?: number
  maxWidth?: number
  minHeight?: number
  maxHeight?: number
}

export type ResizeStyles = {
  top: 'hover' | 'active' | null
  bottom: 'hover' | 'active' | null
  left: 'hover' | 'active' | null
  right: 'hover' | 'active' | null
}

export type ResizeSide = keyof ResizeStyles

export type RenderComponentFn = (
  id: string,
  data: {handle: any; onDelete: () => void; resizeStyles?: ResizeStyles}
) => ReactElement
