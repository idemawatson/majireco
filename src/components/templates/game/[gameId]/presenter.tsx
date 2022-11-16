import { Button, Card, CardContent, CardHeader, Grid, IconButton, Paper } from '@mui/material'
import ReplayIcon from '@mui/icons-material/Replay'
import { useRouter } from 'next/router'
import { FC } from 'react'
import InputGameForm from '@/components/organisms/game/InputGameForm'
import { useGetGame } from '@/hooks/useGetGame'
import { ICreateGameForm } from '@/types/forms/CreateGameForm'

type Props = {
  submitForm: (data: ICreateGameForm) => void
}

const Presenter: FC<Props> = ({ submitForm }) => {
  const router = useRouter()
  const { data, mutate } = useGetGame(router.query.gameId as string)
  return (
    <>
      <Paper
        sx={{
          margin: 2,
        }}
        elevation={0}
      >
        <Card elevation={0}>
          <CardHeader
            title='対局'
            action={
              <Button variant='contained' disableElevation onClick={() => mutate()}>
                <ReplayIcon sx={{ color: 'white' }} />
              </Button>
            }
          />
          <CardContent>
            <Grid container justifyContent='flex-end'>
              <Grid item xs={12}>
                {data && <InputGameForm game={data} submitForm={submitForm} />}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Paper>
    </>
  )
}

export default Presenter
