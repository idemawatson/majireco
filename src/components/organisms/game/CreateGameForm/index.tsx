import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Grid, MenuItem } from '@mui/material'
import { FC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { RhfSelectField } from '@/components/uiParts/SelectField'
import { GAME_RATES, GAME_RATE_SELECTIONS, GAME_RULES, GAME_RULE_SELECTIONS } from '@/libs/const'

import { ICreateGameForm, schema } from '@/types/forms/CreateGameForm'

type Props = {
  submitForm: (data: ICreateGameForm) => void
}

const CreateGameForm: FC<Props> = ({ submitForm }) => {
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

  const formMethods = useForm<ICreateGameForm>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: { rule: GAME_RULES[0], rate: 'NO_RATE' },
  })

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(submitForm)}>
        <Grid container>
          <Grid xs={12} sx={{ my: 2 }} item>
            <RhfSelectField
              label='配点ルール'
              name='rule'
              defaultValue={GAME_RULES[0]}
              control={formMethods.control}
            >
              {ruleSelections}
            </RhfSelectField>
          </Grid>
          <Grid xs={12} sx={{ my: 2 }} item>
            <RhfSelectField
              label='レート'
              name='rate'
              defaultValue={GAME_RATES[0]}
              control={formMethods.control}
            >
              {rateSelections}
            </RhfSelectField>
          </Grid>
          <Grid justifyContent='flex-end' sx={{ my: 2 }} item>
            <Button variant='contained' disableElevation color='secondary' type='submit'>
              ゲームを作成する
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  )
}

export default CreateGameForm
