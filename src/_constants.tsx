import {classes} from '@hivewire/ts-utils'

import {Icon} from '../Icon/Icon'
import {Reversed} from '../Reversed/Reversed'
import {RenderComponentFn} from './_types'

export const defaultMosaicPlaceholder = () => {
  return <div className="bg-control-hover rounded-8 flex-1"></div>
}

export const defaultMosaicComponent: RenderComponentFn = (id, data) => {
  return (
    <div
      className={classes(
        'border-2 border-solid border-control-primary rounded-8 text-white bg-control-primary flex-1 grid place-items-center shadow-s relative min-h-0 min-w-0'
      )}
    >
      <Reversed>
        <span className="absolute top-12 right-36 cursor-pointer">
          <Icon color="primary" icon="remove24" onClick={data.onDelete} />
        </span>
        <span {...data.handle} className="absolute top-12 right-12 cursor-grab">
          <Icon color="primary" icon="drag20" />
        </span>
        {id}
      </Reversed>
    </div>
  )
}

export const defaultDragOverlay = () => {
  return <div className="border-2 rounded-4 bg-control-primary shadow-s w-80 h-40"></div>
}

export const defaultConstraints = (id: string) => ({})
export const defaultCanDrop = (id: string) => true

export const mosaicIdentifier = Symbol('[mosaic]')
