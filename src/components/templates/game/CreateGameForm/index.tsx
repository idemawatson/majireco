import { FC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { GAME_RATES, GAME_RATE_SELECTIONS, GAME_RULES, GAME_RULE_SELECTIONS } from '@/libs/const'

import { Button, Grid, MenuItem } from '@mui/material'
import { RhfSelectField } from '@/components/uiParts/SelectField'
import { Form, schema } from '@/types/forms/CreateGameForm'

type Props = {
  submitForm: (data: Form) => void
}

const component: FC<Props> = ({ submitForm }) => {
  const gameRuleSelections = GAME_RULE_SELECTIONS.map(
    ({ text, value }: { text: string; value: string }) => (
      <MenuItem key={value} value={value}>
        {text}
      </MenuItem>
    ),
  )

  const gameRateSelections = GAME_RATE_SELECTIONS.map(
    ({ text, value }: { text: string; value: string }) => (
      <MenuItem key={value} value={value}>
        {text}
      </MenuItem>
    ),
  )

  const formMethods = useForm<Form>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: { gameRule: GAME_RULES[0], gameRate: 'NO_RATE' },
  })

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(submitForm)}>
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

export default component
