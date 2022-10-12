import TheAppBar from '@/components/uiParts/TheAppBar'
import { TheBottomNavigation } from '@/components/uiParts/TheBottomNavigation'
import { TheAppBackground } from '@/components/uiParts/TheAppBackground'
import { FC, ReactNode } from 'react'

export const MainLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <TheAppBar />
      <TheAppBackground>{children}</TheAppBackground>
      <TheBottomNavigation />
    </>
  )
}
