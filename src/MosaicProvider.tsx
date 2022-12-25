import {DndContext, PointerSensor, useSensor, useSensors} from '@dnd-kit/core'
import {FC, useState} from 'react'

export const MosaicProvider: FC<{}> = ({children}) => {
  const sensors = useSensors(useSensor(PointerSensor, {activationConstraint: {distance: 5}}))
  return <DndContext sensors={sensors}>{children}</DndContext>
}
