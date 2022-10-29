import { Card, CardContent, CardHeader, Grid, Paper } from '@mui/material'
import { FC } from 'react'
import CreateGameForm from '@/components/templates/game/CreateGameForm'
import { Form } from '@/types/forms/CreateGameForm'

type Props = {
  submitForm: (data: Form) => void
}

const Presenter: FC<Props> = ({ submitForm }) => {
  return (
    <>
      <Paper
        sx={{
          margin: 2,
        }}
        elevation={0}
      >
        <Card spacing={2} elevation={0}>
          <CardHeader title='対局を作成する' />
          <CardContent>
            <Grid container justifyContent='flex-end'>
              <Grid xs={12}>
                <CreateGameForm submitForm={submitForm} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Paper>
    </>
  )
}

export default Presenter
