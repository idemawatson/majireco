// import Presenter from '@/pages/home/presenter'
// import { useUserInfoSwr } from '@/pages/home/hooks'
import { withPageAuthRequired, WithPageAuthRequiredProps } from '@auth0/nextjs-auth0'
import { Card, CardContent, CardHeader, Grid, Paper } from '@mui/material'
import { FC } from 'react'
import { MainLayout } from '@/components/layout/MainLayout'
import CreateGameForm from '@/components/organisms/game/CreateGameForm'
import { useCreateGame } from '@/hooks/useCreateGame'
import { ICreateGameForm } from '@/types/forms/CreateGameForm'

const Page: FC = () => {
  const { handleCreateGame } = useCreateGame()
  const submitForm = async (data: ICreateGameForm) => {
    await handleCreateGame(data)
  }
  return (
    <>
      <Paper
        sx={{
          margin: 2,
        }}
        elevation={0}
      >
        <Card elevation={0}>
          <CardHeader title='対局を作成する' />
          <CardContent>
            <Grid container justifyContent='flex-end'>
              <Grid item xs={12}>
                <CreateGameForm submitForm={submitForm} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Paper>
    </>
  )
}

const AuthPage: FC<WithPageAuthRequiredProps> & { layout?: typeof MainLayout } =
  withPageAuthRequired(Page)
AuthPage.layout = MainLayout

export default AuthPage
