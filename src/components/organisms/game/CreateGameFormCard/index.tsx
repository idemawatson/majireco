import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Card, CardContent, Grid } from '@mui/material'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { RhfSelectField } from '@/components/uiParts/SelectField'
import { GAME_RATES, GAME_RATE_SELECTIONS, GAME_RULES, GAME_RULE_SELECTIONS } from '@/libs/const'

import { ICreateGameForm, schema } from '@/types/forms/CreateGameForm'

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
                <Grid justifyContent='flex-end' sx={{ my: 2 }} item>
                  <Button variant='contained' disableElevation color='secondary' type='submit'>
                    ゲームを作成する
                  </Button>
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
