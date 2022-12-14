import { RhfSelectField } from '@/components/uiParts/SelectField'
import { GAME_RATES, GAME_RATE_SELECTIONS, GAME_RULES, GAME_RULE_SELECTIONS } from '@/libs/const'
import { ICreateGameForm, schema } from '@/types/forms/GameCreateForm'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Grid, Paper, Typography } from '@mui/material'
import { FC } from 'react'
import { useForm } from 'react-hook-form'

type Props = {}

const Presenter: FC<Props> = () => {
  const formMethods = useForm<ICreateGameForm>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: { rule: GAME_RULES[0], rate: GAME_RATES[0] },
  })
  return (
    <>
      <Box sx={{ mx: 2, mb: 10 }}>
        <Grid container>
          <Grid xs={6} item>
            <Paper sx={{ mt: 2 }} elevation={0}>
              <form onSubmit={formMethods.handleSubmit(() => {})}>
                <RhfSelectField
                  label='ルール'
                  name='rule'
                  control={formMethods.control}
                  selectPropsList={GAME_RULE_SELECTIONS}
                />
              </form>
            </Paper>
          </Grid>
        </Grid>
        <Grid container>
          <Grid xs={12} item sx={{ px: 1, pt: 2 }}>
            <Paper
              sx={{
                py: 4,
                textAlign: 'center',
                lineHeight: '1.5',
                borderRadius: '16px',
                color: 'primary',
              }}
              elevation={0}
            >
              <Typography variant='h3' sx={{ fontWeight: '500' }}>
                2.42位
              </Typography>
              <Typography variant='subtitle1'>平均着順</Typography>
            </Paper>
          </Grid>
          <Grid xs={12} item sx={{ px: 1, pt: 2 }}>
            <Paper
              sx={{
                py: 4,
                textAlign: 'center',
                lineHeight: '1.5',
                borderRadius: '16px',
                color: 'primary',
              }}
              elevation={0}
            >
              <Typography variant='h3' sx={{ fontWeight: '500' }}>
                +8.5pt
              </Typography>
              <Typography variant='subtitle1'>平均得点</Typography>
            </Paper>
          </Grid>
        </Grid>
        <Grid container>
          <Grid xs={6} item>
            <Paper sx={{ mt: 2 }} elevation={0}>
              <form onSubmit={formMethods.handleSubmit(() => {})}>
                <RhfSelectField
                  label='対戦相手'
                  name='rule'
                  control={formMethods.control}
                  selectPropsList={GAME_RULE_SELECTIONS}
                />
              </form>
            </Paper>
          </Grid>
          <Grid container>
            <Grid xs={12} item sx={{ px: 1, pt: 2 }}>
              <Paper
                sx={{
                  py: 4,
                  textAlign: 'center',
                  lineHeight: '1.5',
                  borderRadius: '16px',
                  color: 'primary',
                }}
                elevation={0}
              >
                <Typography variant='h3' sx={{ fontWeight: '500' }}>
                  2.42位
                </Typography>
                <Typography variant='subtitle1'>平均着順</Typography>
              </Paper>
            </Grid>
            <Grid xs={12} item sx={{ px: 1, pt: 2 }}>
              <Paper
                sx={{
                  py: 4,
                  textAlign: 'center',
                  lineHeight: '1.5',
                  borderRadius: '16px',
                  color: 'primary',
                }}
                elevation={0}
              >
                <Typography variant='h3' sx={{ fontWeight: '500' }}>
                  +8.5pt
                </Typography>
                <Typography variant='subtitle1'>平均得点</Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default Presenter
