import { ReactNode } from 'react'
import Presenter from '@/components/uiParts/TheAppBackground/presenter'

export const TheAppBackground: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <Presenter>{children}</Presenter>
}
