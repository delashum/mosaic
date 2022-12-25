import {DragOverlay, useDraggable} from '@dnd-kit/core'
import {CSS} from '@dnd-kit/utilities'
import {classes} from '@hivewire/ts-utils'
import {FC, ReactNode} from 'react'

import {mosaicIdentifier} from './_constants'

type Props = Readonly<{
  id: string
  className?: string
  renderContent?: (handleProps: any, isDragging: boolean) => ReactNode
}>

export const MosaicItem: FC<Props> = ({id, className, children, renderContent}) => {
  const {listeners, transform, isDragging, setNodeRef} = useDraggable({id, data: {__id: mosaicIdentifier}})
  const containerProps = {
    ref: setNodeRef,
    style: {transform: CSS.Translate.toString(transform)},
  }

  const content = children ?? renderContent?.(listeners, isDragging)

  return (
    <>
      <div {...containerProps} {...listeners} className={classes(className, isDragging && 'opacity-0')}>
        {content}
      </div>
      {isDragging && <DragOverlay>{content}</DragOverlay>}
    </>
  )
}
