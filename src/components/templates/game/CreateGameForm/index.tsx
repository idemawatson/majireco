import * as React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { GAME_RATES, GAME_RATES_TYPE, GAME_RULES, GAME_RULES_TYPE } from '@/libs/const'

import { Button, Grid, MenuItem } from '@mui/material'
import { RhfSelectField } from '@/components/uiParts/SelectField'

export default function Presenter() {
  const gameRuleSelections = GAME_RULES.map((rule: string) => (
    <MenuItem key={rule} value={rule}>
      {rule}
    </MenuItem>
  ))

  const gameRateSelections = GAME_RATES.map((rate: string) => (
    <MenuItem key={rate} value={rate}>
      {rate}
    </MenuItem>
  ))

  type GameCreateModel = {
    gameRule: GAME_RULES_TYPE
    gameRate: GAME_RATES_TYPE
  }
  const schema: yup.SchemaOf<GameCreateModel> = yup.object().shape({
    gameRule: yup.mixed().oneOf(GAME_RULES.concat([])).required('配点ルールを選択してください'),
    gameRate: yup.mixed().oneOf(GAME_RATES.concat([])).required('レートを指定してください'),
  })
  type Form = yup.InferType<typeof schema>
  const formMethods = useForm<Form>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: { gameRule: GAME_RULES[0], gameRate: 'ノーレート' },
  })
  const onSubmit = (data: Form) => console.log(data)

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)}>
        <Grid container>
          <Grid xs={12} sx={{ my: 2 }} item>
            <RhfSelectField
              label='配点ルール'
              name='gameRule'
              defaultValue={GAME_RULES[0]}
              control={formMethods.control}
            >
              {gameRuleSelections}
            </RhfSelectField>
          </Grid>
          <Grid xs={12} sx={{ my: 2 }} item>
            <RhfSelectField
              label='レート'
              name='gameRate'
              defaultValue={GAME_RATES[0]}
              control={formMethods.control}
            >
              {gameRateSelections}
            </RhfSelectField>
          </Grid>
          <Grid justifyContent='flex-end' sx={{ my: 2 }} item>
            <Button variant='contained' disableElevation color='primary' type='submit'>
              ゲームを作成する
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  )
}
