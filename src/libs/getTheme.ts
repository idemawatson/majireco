import { createTheme } from '@mui/material'
import { PLAYER_THEME_TYPE } from './const'

const THEME_PALETTE = {
  T1: {
    primary: {
      main: '#c6ae6f',
      contrastText: '#00171f',
    },
  },
  T2: {
    primary: {
      main: '#0582c8',
      contrastText: '#fff',
    },
  },
  T3: {
    primary: {
      main: '#f895b5',
      contrastText: '#000066',
    },
    secondary: {
      main: '#000066',
      contrastText: '#fff',
    },
  },
  T4: {
    primary: {
      main: '#9cb832',
      contrastText: '#00171f',
    },
    secondary: {
      main: '#b71a35',
      contrastText: '#fff',
    },
  },
  T5: {
    primary: {
      main: '#920101',
      contrastText: '#fff',
    },
    secondary: {
      main: '#1b885e',
      contrastText: '#fff',
    },
  },
  T6: {
    primary: {
      main: '#b74801',
      contrastText: '#fff',
    },
    secondary: {
      main: '#79bd36',
      contrastText: '#fff',
    },
  },
  T7: {
    primary: {
      main: '#000',
      contrastText: '#fff',
    },
    secondary: {
      main: '#e60012',
      contrastText: '#fff',
    },
  },
  T8: {
    primary: {
      main: '#dbb400',
      contrastText: '#00171f',
    },
  },
}

export default (theme: string) => {
  const palette = THEME_PALETTE[(theme as PLAYER_THEME_TYPE) || 'T1']
  return createTheme({
    typography: {
      fontFamily: "'Noto Sans JP', 'sans-serif'",
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
    },
    palette: {
      secondary: {
        main: '#00171f',
        contrastText: '#fff',
      },
      ...palette,
    },
  })
}
