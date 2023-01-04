import { Grid, InputAdornment } from '@mui/material'
import { FC } from 'react'
import { IRecordCreateForm } from '@/types/forms/RecordCreateForm'
import { Control } from 'react-hook-form'
import { RhfTextField } from '@/components/uiParts/TextField'

type Props = {
  players: {
    playerId: string
    playerName: string
  }[]
  control: Control<IRecordCreateForm, any>
}

const RecordPointForm: FC<Props> = ({ players, control }) => {
  const endAdornment = <InputAdornment position='end'>00</InputAdornment>
  return (
    <>
      <Grid item xs={12} sx={{ mx: 2 }}>
        <Grid container>
          <Grid xs={8} sx={{ my: 1 }} item>
            <RhfTextField
              label={players[0].playerName}
              name='p1Point'
              type='number'
              endAdornment={endAdornment}
              control={control}
            />
          </Grid>
          <Grid xs={8} sx={{ my: 1 }} item>
            <RhfTextField
              label={players[1].playerName}
              name='p2Point'
              type='number'
              endAdornment={endAdornment}
              control={control}
            />
          </Grid>
          <Grid xs={8} sx={{ my: 1 }} item>
            <RhfTextField
              label={players[2].playerName}
              name='p3Point'
              type='number'
              endAdornment={endAdornment}
              control={control}
            />
          </Grid>
          <Grid xs={8} sx={{ my: 1 }} item>
            <RhfTextField
              label={players[3].playerName}
              name='p4Point'
              type='number'
              endAdornment={endAdornment}
              control={control}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default RecordPointForm
