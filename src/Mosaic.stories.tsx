import {classes, randStr} from '@hivewire/ts-utils'
import {useState} from 'react'

import {SortableCanvas, SortableList2} from '../..'
import {Card} from '../Card/Card'
import {NumberInput} from '../NumberInput/NumberInput'
import {VirtualGrid} from '../VirtualGrid/VirtualGrid'
import {Mosaic} from './Mosaic'
import {MosaicItem} from './MosaicItem'
import {MosaicProvider} from './MosaicProvider'

export default {
  title: 'Components/Mosaic',
  component: Mosaic,
}

const simpleLayout = [
  {x: 0.5, y: 0.5, w: 0.5, h: 0.5, id: 'a-lo01wofvtu'},
  {x: 0, y: 0.5, w: 0.5, h: 0.5, id: 'a-rbv5pi2b9b'},
  {y: 0, x: 0, h: 0.5, w: 1, id: 'a-v0rzxglmfr'},
]

const snapTestLayout = [
  {
    x: 0.598962825826268,
    y: 0.3991981672394044,
    w: 0.4010371741737319,
    h: 0.6008018327605956,
    id: 'd-lo01wofvtu',
  },
  {
    x: 0,
    y: 0.3991981672394044,
    w: 0.598962825826268,
    h: 0.6008018327605956,
    id: 'c-rbv5pi2b9b',
  },
  {
    y: 0,
    x: 0.3815138956093661,
    h: 0.3991981672394044,
    w: 0.6184861043906339,
    id: 'b-v0rzxglmfr',
  },
  {
    x: 0,
    y: 0,
    w: 0.3815138956093661,
    h: 0.3991981672394044,
    id: 'a-vkdkrmn6mh',
  },
]

const complexLayout = [
  {
    y: 0,
    x: 0,
    h: 0.25,
    w: 0.3333333333333333,
    id: 'a-i4pk8h805k',
  },
  {
    x: 0.3333333333333333,
    y: 0,
    w: 0.3333333333333333,
    h: 0.25,
    id: 'a-g1042l8o4i',
  },
  {
    y: 0,
    x: 0.75,
    h: 0.08333333333333333,
    w: 0.08333333333333333,
    id: 'b-ph6zjkw33s',
  },
  {
    x: 0.8333333333333334,
    y: 0.04166666666666667,
    w: 0.08333333333333333,
    h: 0.041666666666666664,
    id: 'a-2ilgwrw1gy',
  },
  {
    y: 0,
    x: 0.8333333333333334,
    h: 0.041666666666666664,
    w: 0.08333333333333333,
    id: 'b-7ctz0y1thc',
  },
  {
    x: 0.9166666666666666,
    y: 0,
    w: 0.08333333333333333,
    h: 0.08333333333333333,
    id: 'b-xq0tbv33uq',
  },
  {
    x: 0.6666666666666666,
    y: 0,
    w: 0.08333333333333333,
    h: 0.08333333333333333,
    id: 'b-jx2jqi7614',
  },
  {
    y: 0.08333333333333334,
    x: 0.6666666666666666,
    h: 0.08333333333333333,
    w: 0.3333333333333333,
    id: 'c-qh8qnvhfeb',
  },
  {
    y: 0.16666666666666666,
    x: 0.6666666666666666,
    h: 0.08333333333333333,
    w: 0.33333333333333337,
    id: 'b-kld3pnhgyl',
  },
  {
    y: 0.5,
    x: 0,
    h: 0.25,
    w: 0.5,
    id: 'c-0vvmv7vowh',
  },
  {
    x: 0.5,
    y: 0.5,
    w: 0.5,
    h: 0.25,
    id: 'b-qxouo2fs26',
  },
  {
    x: 0,
    y: 0.75,
    w: 0.5,
    h: 0.25,
    id: 'b-9vouq6pctm',
  },
  {
    x: 0.5,
    y: 0.75,
    w: 0.5,
    h: 0.25,
    id: 'a-3fxuo11g9w',
  },
  {
    y: 0.25,
    x: 0,
    h: 0.25,
    w: 0.25,
    id: 'c-tg35e8cklp',
  },
  {
    x: 0.5,
    y: 0.25,
    w: 0.25,
    h: 0.25,
    id: 'c-cfyd0f10la',
  },
  {
    x: 0.75,
    y: 0.25,
    w: 0.25,
    h: 0.25,
    id: 'b-tvkxxcwvr4',
  },
  {
    x: 0.25,
    y: 0.25,
    w: 0.25,
    h: 0.25,
    id: 'b-k2dpiyk3ue',
  },
]

const transformItem = (id: string) => {
  if (id.length === 1) return `${id}-${randStr()}`
  else return id
}

const MosaicDraggable = ({id, label}: {id: string; label?: string}) => {
  label ??= `Drag me ${id}`
  return (
    <MosaicItem
      id={id}
      renderContent={(handle, dragging) => (
        <div
          {...handle}
          className={classes(
            'bg-panel-primary-r text-default-r py-8 px-12 rounded-8',
            'font-bold transform cursor-grab z-1 transition-shadow',
            dragging && 'shadow-xl-r'
          )}
        >
          {label}
        </div>
      )}
    />
  )
}

export const Default = () => {
  const [layout, setLayout] = useState([])
  const [gap, setGap] = useState(8)
  return (
    <MosaicProvider>
      <div className="flex flex-row gap-16 h-full absolute w-full top-0 left-0 p-16 overflow-hidden">
        <Card className="w-[15%] !flex flex-col gap-8">
          <MosaicDraggable id="a" />
          <MosaicDraggable id="b" />
          <MosaicDraggable id="c" />
          <NumberInput value={gap} onChange={setGap} />
        </Card>
        <Card className="grow">
          <Mosaic
            gap={gap}
            layout={layout}
            onLayoutChange={(newLayout) => {
              setLayout(newLayout)
              console.log({newLayout})
            }}
            dropTransform={transformItem}
          />
        </Card>
      </div>
    </MosaicProvider>
  )
}

export const StartWithLayout = () => {
  const [layout, setLayout] = useState(simpleLayout)
  const [gap, setGap] = useState(8)
  return (
    <MosaicProvider>
      <div className="flex flex-row gap-16 h-full absolute w-full top-0 left-0 p-16 overflow-hidden">
        <Card className="w-[15%] !flex flex-col gap-8">
          <MosaicDraggable id="a" />
          <MosaicDraggable id="b" />
          <MosaicDraggable id="c" />
          <NumberInput value={gap} onChange={setGap} />
        </Card>
        <Card className="grow">
          <Mosaic
            gap={gap}
            layout={layout}
            onLayoutChange={(newLayout) => {
              setLayout(newLayout)
              console.log({newLayout})
            }}
            dropTransform={transformItem}
          />
        </Card>
      </div>
    </MosaicProvider>
  )
}

export const GridSnapping = () => {
  const [layout, setLayout] = useState(snapTestLayout)
  const [gap, setGap] = useState(8)
  const [snap, setSnap] = useState(10)
  return (
    <MosaicProvider>
      <div className="flex flex-row gap-16 h-full absolute w-full top-0 left-0 p-16 overflow-hidden">
        <Card className="w-[15%] !flex flex-col gap-8">
          <MosaicDraggable id="a" />
          <MosaicDraggable id="b" />
          <MosaicDraggable id="c" />
          <NumberInput value={gap} onChange={setGap} />
          <NumberInput value={snap} onChange={setSnap} />
        </Card>
        <Card className="grow">
          <Mosaic
            resizeSnapTolerance={snap}
            gap={gap}
            layout={layout}
            onLayoutChange={(newLayout) => {
              setLayout(newLayout)
              console.log({newLayout})
            }}
            dropTransform={transformItem}
          />
        </Card>
      </div>
    </MosaicProvider>
  )
}

export const StartWithComplex = () => {
  const [layout, setLayout] = useState(complexLayout)
  const [gap, setGap] = useState(8)
  return (
    <MosaicProvider>
      <div className="flex flex-row gap-16 h-full absolute w-full top-0 left-0 p-16 overflow-hidden">
        <Card className="w-[15%] !flex flex-col gap-8">
          <MosaicDraggable id="a" />
          <MosaicDraggable id="b" />
          <MosaicDraggable id="c" />
          <NumberInput value={gap} onChange={setGap} />
        </Card>
        <Card className="grow">
          <Mosaic
            gap={gap}
            layout={layout}
            onLayoutChange={(newLayout) => {
              setLayout(newLayout)
              console.log({newLayout})
            }}
            dropTransform={transformItem}
          />
        </Card>
      </div>
    </MosaicProvider>
  )
}

export const ExpensiveComponents = () => {
  const [layout, setLayout] = useState([])
  return (
    <MosaicProvider>
      <div className="flex flex-row gap-16 h-full absolute w-full top-0 left-0 p-16 overflow-hidden">
        <Card className="w-[15%] !flex flex-col gap-8">
          <MosaicDraggable id="a" />
          <MosaicDraggable id="b" />
          <MosaicDraggable id="c" />
        </Card>
        <Card className="grow">
          <Mosaic
            layout={layout}
            onLayoutChange={(newLayout) => {
              setLayout(newLayout)
              console.log({newLayout})
            }}
            dropTransform={transformItem}
            renderComponent={() => {
              return (
                <div className="bg-panel-secondary shadow-s rounded-8 w-full h-full flex">
                  <VirtualGrid
                    rowCount={100}
                    columnCount={100}
                    renderCell={(r, c, props) => <div {...props}>{`${r},${c}`}</div>}
                  />
                </div>
              )
            }}
          />
        </Card>
      </div>
    </MosaicProvider>
  )
}

export const NotAllowed = () => {
  const [layout, setLayout] = useState([])
  const [gap, setGap] = useState(8)
  return (
    <MosaicProvider>
      <div className="flex flex-row gap-16 h-full absolute w-full top-0 left-0 p-16 overflow-hidden">
        <Card className="w-[15%] !flex flex-col gap-8">
          <MosaicDraggable id="a" label="Allowed" />
          <MosaicDraggable id="b" label="Allowed" />
          <MosaicDraggable id="c" label="Not Allowed" />
          <NumberInput value={gap} onChange={setGap} />
        </Card>
        <Card className="grow">
          <Mosaic
            gap={gap}
            layout={layout}
            canDrop={(id) => id !== 'c'}
            onLayoutChange={(newLayout) => {
              setLayout(newLayout)
              console.log({newLayout})
            }}
            dropTransform={transformItem}
          />
        </Card>
      </div>
    </MosaicProvider>
  )
}

const DraggableThing = ({name, ...props}) => {
  return (
    <div
      {...props}
      className={classes(
        'bg-panel-primary-r text-default-r py-8 px-12 rounded-8',
        'font-bold transform cursor-grab z-1 transition-shadow mb-8'
      )}
    >
      {name}
    </div>
  )
}

const newItemId = 'New Sortable Item'
export const DropzoneConflicts = () => {
  const [layout, setLayout] = useState([])
  const [items, setItems] = useState({A: [newItemId], B: ['2', '3']})
  const [gap, setGap] = useState(8)
  return (
    <MosaicProvider>
      <SortableCanvas
        renderItem={(ctx) => <DraggableThing name={ctx.id} />}
        items={items}
        onChange={(newOrder) => {
          setItems(newOrder as any)
        }}
        onDragEnd={() => {
          const itemCopy = [...items.B]
          const newItemIdx = itemCopy.indexOf(newItemId)
          if (newItemIdx !== -1) itemCopy[newItemIdx] = (itemCopy.length + 1).toString()

          setItems((c) => ({A: [newItemId], B: itemCopy}))
        }}
      >
        <div className="flex flex-row gap-16 h-full absolute w-full top-0 left-0 p-16 overflow-hidden">
          <Card className="w-[15%] !flex flex-col gap-8">
            <MosaicDraggable id="a" label="MosaicItem" />
            <SortableList2
              isMultiList
              id="A"
              items={items.A}
              renderItem={(ctx) => <DraggableThing name="new Sortable Item" {...ctx.listeners} />}
            />
            <NumberInput value={gap} onChange={setGap} />
          </Card>
          <Card className="flex-grow">
            <Mosaic
              gap={gap}
              layout={layout}
              canDrop={(id) => id !== 'c'}
              onLayoutChange={(newLayout) => {
                setLayout(newLayout)
                console.log({newLayout})
              }}
              dropTransform={transformItem}
            />
          </Card>
          <Card>
            <SortableList2
              isMultiList
              id="B"
              items={items.B}
              renderItem={(ctx) => <DraggableThing name={ctx.id} {...ctx.listeners} />}
            />
          </Card>
        </div>
      </SortableCanvas>
    </MosaicProvider>
  )
}
