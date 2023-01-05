import { withPageAuthRequired, WithPageAuthRequiredProps } from '@auth0/nextjs-auth0'
import { FC } from 'react'
import { MainLayout } from '@/components/layout/MainLayout'
import Page from '@/components/templates/game/join/[gameId]'

const AuthPage: FC<WithPageAuthRequiredProps> & { layout?: typeof MainLayout } =
  withPageAuthRequired(Page)
AuthPage.layout = MainLayout

export default AuthPage
