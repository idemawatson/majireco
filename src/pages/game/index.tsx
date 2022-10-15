// import Presenter from '@/pages/home/presenter'
// import { useUserInfoSwr } from '@/pages/home/hooks'
import { MainLayout } from '@/components/layout/MainLayout'
import { withPageAuthRequired, WithPageAuthRequiredProps } from '@auth0/nextjs-auth0'
import { FC } from 'react'
import Presenter from './presenter'

const Page: FC = () => {
  const allPlayers = [
    { name: 'プレイヤー1' },
    { name: 'プレイヤー2' },
    { name: 'プレイヤー3' },
    { name: 'プレイヤー4' },
  ]
  return (
    <>
      <Presenter allPlayers={allPlayers}></Presenter>
    </>
  )
}

const AuthPage: FC<WithPageAuthRequiredProps> & { layout?: typeof MainLayout } =
  withPageAuthRequired(Page)
AuthPage.layout = MainLayout

export default AuthPage
