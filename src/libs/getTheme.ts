import { createTheme } from '@mui/material'
import { PLAYER_THEME_TYPE } from './const'

const THEME_PALLETES = {
  T1: {
    primary: {
      main: '#00171f',
      contrastText: '#fff',
    },
    secondary: {
      main: '#c6ae6f',
      contrastText: '#fff',
    },
  },
  T2: {
    primary: {
      main: '#0582c8',
      contrastText: '#fff',
    },
    secondary: {
      main: '#231815',
      contrastText: '#fff',
    },
  },
  T3: {},
  T4: {},
  T5: {},
  T6: {},
  T7: {},
  T8: {},
}

export default (theme: string) => {
  const palette = THEME_PALLETES[(theme as PLAYER_THEME_TYPE) || 'T1']
  return createTheme({
    typography: {
      fontFamily: "'Noto Sans JP', 'sans-serif'",
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
    },
    palette,
  })
}
