import { useTheme } from '@/hooks/useTheme'
import { PLAYER_THEME } from '@/libs/const'
import getTheme from '@/libs/getTheme'
import { ThemeProvider } from '@emotion/react'
import React, { FC, ReactNode, useEffect } from 'react'

const MyThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (theme) {
        localStorage.setItem('theme', theme)
      } else {
        setTheme(localStorage.getItem('theme') || PLAYER_THEME.T1)
      }
    }
  }, [theme])

  return <ThemeProvider theme={getTheme(theme)}>{children}</ThemeProvider>
}

export default MyThemeProvider
