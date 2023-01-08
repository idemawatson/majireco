import '../styles/globals.css'
import { UserProvider } from '@auth0/nextjs-auth0'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { FC, ReactNode } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { MainLayout } from '@/components/layout/MainLayout'
import MyThemeProvider from '@/components/uiParts/MyThemeProvider'
import { ErrorFallback } from '@/components/uiParts/TheErrorBoundary'
import { TheLoading } from '@/components/uiParts/TheLoading'
import { TheNotificationToast } from '@/components/uiParts/TheNotificationToast'

type NextPageWithLayout = NextPage & {
  layout?: typeof MainLayout
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const MyApp: FC<AppPropsWithLayout> = ({ Component, pageProps }: AppPropsWithLayout) => {
  const Layout = Component.layout || (({ children }: { children: ReactNode }) => <>{children}</>)
  return (
    <>
      <UserProvider>
        <CssBaseline>
          <MyThemeProvider>
            <Layout>
              <TheLoading />
              <TheNotificationToast />
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Component {...pageProps} />
              </ErrorBoundary>
            </Layout>
          </MyThemeProvider>
        </CssBaseline>
      </UserProvider>
    </>
  )
}

export default MyApp
