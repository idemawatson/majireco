// import Presenter from '@/pages/home/presenter'
// import { useUserInfoSwr } from '@/pages/home/hooks'
import { useUser, withPageAuthRequired, WithPageAuthRequiredProps } from '@auth0/nextjs-auth0'
import { Paper, Typography } from '@mui/material'
import { FC } from 'react'
import { MainLayout } from '@/components/layout/MainLayout'

const Page: FC = () => {
  const { user } = useUser()
  return (
    <>
      <Paper>
        <Typography variant='h1' color='initial'>
          {`Welcome ${user?.given_name!}`}
        </Typography>
        <Typography>{`name: ${user?.nickname}!`}</Typography>
      </Paper>
    </>
  )
}

const AuthPage: FC<WithPageAuthRequiredProps> & { layout?: typeof MainLayout } =
  withPageAuthRequired(Page)
AuthPage.layout = MainLayout

export default AuthPage
