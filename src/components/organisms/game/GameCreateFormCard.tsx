import { yupResolver } from '@hookform/resolvers/yup'
import { Card, CardContent, CardHeader, Grid } from '@mui/material'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { BaseButton } from '@/components/uiParts/BaseButton'
import { RhfSelectField } from '@/components/uiParts/SelectField'
import { GAME_RATES, GAME_RATE_SELECTIONS, GAME_RULES, GAME_RULE_SELECTIONS } from '@/libs/const'

import { ICreateGameForm, schema } from '@/types/forms/GameCreateForm'

type Props = {
  submitForm: (data: ICreateGameForm) => void
}

const CreateGameFormCard: FC<Props> = ({ submitForm }) => {
  const formMethods = useForm<ICreateGameForm>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: { rule: GAME_RULES[0], rate: GAME_RATES[0] },
  })

  return (
    <Card elevation={0}>
      <CardHeader title='対局作成'></CardHeader>
      <CardContent>
        <Grid container justifyContent='flex-end'>
          <Grid item xs={12}>
            <form onSubmit={formMethods.handleSubmit(submitForm)}>
              <Grid container>
                <Grid xs={12} sx={{ my: 2 }} item>
                  <RhfSelectField
                    label='配点ルール'
                    name='rule'
                    control={formMethods.control}
                    selectPropsList={GAME_RULE_SELECTIONS}
                  />
                </Grid>
                <Grid xs={12} sx={{ my: 2 }} item>
                  <RhfSelectField
                    label='レート'
                    name='rate'
                    control={formMethods.control}
                    selectPropsList={GAME_RATE_SELECTIONS}
                  />
                </Grid>
                <Grid xs={12} sx={{ mt: 2, textAlign: 'end' }} item>
                  <BaseButton color='secondary' submit={true}>
                    対局を作成する
                  </BaseButton>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default CreateGameFormCard
