import { Card, CardContent, CardHeader, Grid, IconButton, Paper } from '@mui/material'
import MoreVert from '@mui/icons-material/MoreVert'

import { FC } from 'react'
import CreateGameForm from '@/components/organisms/game/CreateGameForm'
import { ICreateGameForm } from '@/types/forms/CreateGameForm'

type Props = {
  submitForm: (data: ICreateGameForm) => void
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
        <Card elevation={0}>
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

export default Presenter
