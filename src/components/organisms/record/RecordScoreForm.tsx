import { Grid, Typography } from '@mui/material'
import { FC } from 'react'
import { Control } from 'react-hook-form'
import { RhfTextField } from '@/components/uiParts/TextField'
import { IRecordCreateForm } from '@/types/forms/RecordCreateForm'

type Props = {
  players: {
    playerId: string
    playerName: string
  }[]
  control: Control<IRecordCreateForm, any>
}

const RecordScoreForm: FC<Props> = ({ players, control }) => {
  return (
    <>
      <Typography variant='subtitle2' sx={{ py: 1 }}>
        トビ賞や同点時のポイント調整を行ってください
      </Typography>
      <Grid item xs={12}>
        <Grid container>
          <Grid xs={8} sx={{ my: 1 }} item>
            <RhfTextField
              label={players[0].playerName}
              name='p1Score'
              type='number'
              control={control}
            />
          </Grid>
          <Grid xs={8} sx={{ my: 1 }} item>
            <RhfTextField
              label={players[1].playerName}
              name='p2Score'
              type='number'
              control={control}
            />
          </Grid>
          <Grid xs={8} sx={{ my: 1 }} item>
            <RhfTextField
              label={players[2].playerName}
              name='p3Score'
              type='number'
              control={control}
            />
          </Grid>
          <Grid xs={8} sx={{ my: 1 }} item>
            <RhfTextField
              label={players[3].playerName}
              name='p4Score'
              type='number'
              control={control}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default RecordScoreForm
