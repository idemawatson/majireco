import { Card, CardContent, CardHeader, Grid, Paper } from '@mui/material'
import { FC } from 'react'
import InputGameForm from '@/components/templates/game/InputGameForm'
import { Form } from '@/types/forms/CreateGameForm'

type Props = {
  submitForm: (data: Form) => void
}

const Presenter: FC<Props> = ({ submitForm }) => {
  const players = [{ name: 'p1' }, { name: 'p2' }]
  return (
    <>
      <Paper
        sx={{
          margin: 2,
        }}
        elevation={0}
      >
        <Card elevation={0}>
          <CardHeader title='対局' />
          <CardContent>
            <Grid container justifyContent='flex-end'>
              <Grid item xs={12}>
                <InputGameForm players={players} submitForm={submitForm} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Paper>
    </>
  )
}

export default Presenter
