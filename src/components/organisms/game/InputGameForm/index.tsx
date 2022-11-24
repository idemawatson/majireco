import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Grid, MenuItem, List, ListItem, ListItemText, Typography } from '@mui/material'
import { FC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { RhfSelectField } from '@/components/uiParts/SelectField'
import { GAME_RATES, GAME_RATE_SELECTIONS, GAME_RULES, GAME_RULE_SELECTIONS } from '@/libs/const'

import { GetGameResponseDTO } from '@/usecases/GetGame/GetGameDto'
import { IUpdateGameForm, schema } from '@/types/forms/UpdateGameForm'

type Props = {
  submitForm: (data: IUpdateGameForm) => void
  game: GetGameResponseDTO
}

const InputGameForm: FC<Props> = ({ submitForm, game }) => {
  const ruleSelections = GAME_RULE_SELECTIONS.map(
    ({ text, value }: { text: string; value: string }) => (
      <MenuItem key={value} value={value}>
        {text}
      </MenuItem>
    ),
  )

  const rateSelections = GAME_RATE_SELECTIONS.map(
    ({ text, value }: { text: string; value: string }) => (
      <MenuItem key={value} value={value}>
        {text}
      </MenuItem>
    ),
  )

  const playerList = Array.from(Array(4).keys()).map((i) => {
    const pg =
      game?.belongingPlayers && game?.belongingPlayers[i] ? game?.belongingPlayers[i] : null
    return (
      <ListItem sx={{ py: 0 }} key={i}>
        <ListItemText primary={`${i + 1}. ${pg ? pg.playerName : '未参加'}`}></ListItemText>
      </ListItem>
    )
  })

  const formMethods = useForm<IUpdateGameForm>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  })

  const isEnoughMember = game.belongingPlayers?.length === 4

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(submitForm)}>
        <Grid container>
          <Grid xs={12} sx={{ my: 2 }} item>
            <RhfSelectField
              label='配点ルール'
              name='rule'
              defaultValue={game.rule}
              control={formMethods.control}
            >
              {ruleSelections}
            </RhfSelectField>
          </Grid>
          <Grid xs={12} sx={{ my: 2 }} item>
            <RhfSelectField
              label='レート'
              name='rate'
              defaultValue={game.rate}
              control={formMethods.control}
            >
              {rateSelections}
            </RhfSelectField>
          </Grid>
          <Grid xs={12} sx={{ my: 2 }} item>
            <Typography variant='subtitle1' color='initial'>
              参加プレイヤー
            </Typography>
            {isEnoughMember || (
              <Typography variant='caption' color='error' fontSize={'14px'}>
                メンバーが不足しています
              </Typography>
            )}
            <List>{playerList}</List>
          </Grid>
          <Grid xs={12} sx={{ my: 2, textAlign: 'right' }} item>
            <Button
              variant='contained'
              disableElevation
              color='secondary'
              type='submit'
              disabled={!isEnoughMember}
            >
              ゲームを開始する
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  )
}

export default InputGameForm
