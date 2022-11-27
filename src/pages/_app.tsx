import '../styles/globals.css'
import { UserProvider } from '@auth0/nextjs-auth0'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { FC, ReactNode } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { MainLayout } from '@/components/layout/MainLayout'
import { ErrorFallback } from '@/components/uiParts/TheErrorBoundary'
import { TheLoading } from '@/components/uiParts/TheLoading'
import { TheNotificationToast } from '@/components/uiParts/TheNotificationToast'

type NextPageWithLayout = NextPage & {
  layout?: typeof MainLayout
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const theme = createTheme({
  typography: {
    fontFamily: "'Noto Sans JP', 'sans-serif'",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
  palette: {
    primary: {
      main: '#00171f',
      contrastText: '#fff',
    },
    secondary: {
      main: '#c6ae6f',
      contrastText: '#fff',
    },
  },
})

const MyApp: FC<AppPropsWithLayout> = ({ Component, pageProps }: AppPropsWithLayout) => {
  const Layout = Component.layout || (({ children }: { children: ReactNode }) => <>{children}</>)
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <UserProvider>
            <Layout>
              <TheLoading />
              <TheNotificationToast />
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Component {...pageProps} />
              </ErrorBoundary>
            </Layout>
          </UserProvider>
        </CssBaseline>
      </ThemeProvider>
    </>
  )
}

export default MyApp
