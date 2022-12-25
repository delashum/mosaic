import {FC, ReactElement, ReactNode} from 'react'

type Props = Readonly<{
  id: string
  renderPlaceholder: (id: string) => ReactElement
}>

export const MosaicPlaceholder: FC<Props> = ({id, renderPlaceholder}) => {
  return renderPlaceholder(id)
}
