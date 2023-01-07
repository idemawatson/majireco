import { styled } from '@mui/material'
import { grey } from '@mui/material/colors'
import { FC, ReactNode } from 'react'
import { TheAppBackground } from '@/components/uiParts/TheAppBackground'
import TheAppBar from '@/components/uiParts/TheAppBar'
import { TheBottomNavigation } from '@/components/uiParts/TheBottomNavigation'

export const MainLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <TheAppBar />
      <TheAppBackground>{children}</TheAppBackground>
      <TheBottomNavigation />
    </>
  )
}
