import { Grid, Typography } from '@mui/material'
import { FC } from 'react'
import { Control } from 'react-hook-form'
import { RhfTextField } from '@/components/uiParts/TextField'
import { IRecordCreateForm } from '@/types/forms/RecordCreateForm'
import { BaseButton } from '@/components/uiParts/BaseButton'

type Props = {
  players: {
    playerId: string
    playerName: string
  }[]
  control: Control<IRecordCreateForm, any>
  addScore: (key: 'p1Score' | 'p2Score' | 'p3Score' | 'p4Score', addition: number) => void
}

const RecordScoreForm: FC<Props> = ({ players, control, addScore }) => {
  return (
    <>
      <Typography variant='subtitle2' sx={{ py: 1 }}>
        トビ賞や同点時のポイント調整を行ってください
      </Typography>
      <Grid item xs={12} sx={{ mx: 2 }}>
        <Grid container>
          <Grid xs={8} sx={{ my: 1 }} alignSelf='center' item>
            <RhfTextField
              label={players[0].playerName}
              name='p1Score'
              type='number'
              control={control}
            />
          </Grid>
          <Grid xs={4} alignSelf='center' textAlign='end' item>
            <BaseButton color='secondary' onClick={() => addScore('p1Score', 10)} size='large'>
              +10
            </BaseButton>
          </Grid>
        </Grid>
        <Grid container>
          <Grid xs={8} sx={{ my: 1 }} item>
            <RhfTextField
              label={players[1].playerName}
              name='p2Score'
              type='number'
              control={control}
            />
          </Grid>
          <Grid xs={4} alignSelf='center' textAlign='end' item>
            <BaseButton color='secondary' onClick={() => addScore('p2Score', 10)} size='large'>
              +10
            </BaseButton>
          </Grid>
        </Grid>
        <Grid container>
          <Grid xs={8} sx={{ my: 1 }} item>
            <RhfTextField
              label={players[2].playerName}
              name='p3Score'
              type='number'
              control={control}
            />
          </Grid>
          <Grid xs={4} alignSelf='center' textAlign='end' item>
            <BaseButton color='secondary' onClick={() => addScore('p3Score', 10)} size='large'>
              +10
            </BaseButton>
          </Grid>
        </Grid>
        <Grid container>
          <Grid xs={8} sx={{ my: 1 }} alignSelf='center' item>
            <RhfTextField
              label={players[3].playerName}
              name='p4Score'
              type='number'
              control={control}
            />
          </Grid>
          <Grid xs={4} alignSelf='center' textAlign='end' item>
            <BaseButton color='secondary' onClick={() => addScore('p4Score', 10)} size='large'>
              +10
            </BaseButton>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default RecordScoreForm
