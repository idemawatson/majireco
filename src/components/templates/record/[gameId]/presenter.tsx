import {
  Box,
  Button,
  Fab,
  Grid,
  Paper,
  Step,
  StepLabel,
  Stepper,
  styled,
  SwipeableDrawer,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useRouter } from 'next/router'
import { FC, Suspense, useState } from 'react'
import { useGetGame } from '@/hooks/useGetGame'
import RoundRecordBoard from '@/components/organisms/record/RoundRecordBoard'
import RecordPointForm from '@/components/organisms/record/RecordPointForm'
import RecordScoreForm from '@/components/organisms/record/RecordScoreForm'
import { IRecordCreateForm, schema } from '@/types/forms/RecordCreateForm'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import calcRecordScores from '@/libs/calcRecordScores'
import { Loading } from './loading'

const FixedFab = styled(Fab)(() => ({
  margin: 0,
  top: 'auto',
  right: 20,
  bottom: 80,
  left: 'auto',
  position: 'fixed',
}))

type Props = {
  submitForm: (form: IRecordCreateForm) => void
}

const steps = ['点数入力', 'スコア確認']

const Presenter: FC<Props> = ({ submitForm }) => {
  const router = useRouter()
  const { data } = useGetGame(router.query.gameId as string)
  const [drawer, setDrawer] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const defaultValues = {
    p1Point: 0,
    p2Point: 0,
    p3Point: 0,
    p4Point: 0,
    p1Score: 0,
    p2Score: 0,
    p3Score: 0,
    p4Score: 0,
    player1: data?.belongingPlayers[0].playerId,
    player2: data?.belongingPlayers[1].playerId,
    player3: data?.belongingPlayers[2].playerId,
    player4: data?.belongingPlayers[3].playerId,
  }

  const {
    handleSubmit,
    control,
    getValues,
    setValue,
    formState: { isValid },
    reset,
  } = useForm<IRecordCreateForm>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues,
  })

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          data && (
            <RecordPointForm players={data.belongingPlayers} control={control}></RecordPointForm>
          )
        )
      case 1:
        return (
          data && (
            <RecordScoreForm players={data.belongingPlayers} control={control}></RecordScoreForm>
          )
        )
      default:
        return <div>Not Found</div>
    }
  }

  const _handleSubmit = (form: IRecordCreateForm) => {
    if (activeStep === steps.length - 1) {
      submitForm(form)
      reset(defaultValues)
      setActiveStep(0)
      setDrawer(false)
    } else {
      if (data) {
        const [score1, score2, score3, score4] = calcRecordScores(
          [
            { playerId: data.belongingPlayers[0].playerId, point: getValues('p1Point') },
            { playerId: data.belongingPlayers[1].playerId, point: getValues('p2Point') },
            { playerId: data.belongingPlayers[2].playerId, point: getValues('p3Point') },
            { playerId: data.belongingPlayers[3].playerId, point: getValues('p4Point') },
          ],
          data.rule,
        )
        setValue('p1Score', score1)
        setValue('p2Score', score2)
        setValue('p3Score', score3)
        setValue('p4Score', score4)
      }
      setActiveStep(activeStep + 1)
    }
  }

  return (
    <>
      <Paper
        sx={{
          my: 2,
          mx: 2,
        }}
        elevation={0}
      >
        {data && (
          <RoundRecordBoard
            belongingPlayers={data.belongingPlayers}
            roundRecords={data.roundRecords}
          />
        )}
      </Paper>
      <FixedFab color='primary' aria-label='add' onClick={() => setDrawer(true)}>
        <AddIcon />
      </FixedFab>
      {data && (
        <>
          <SwipeableDrawer
            anchor='bottom'
            open={drawer}
            onOpen={() => setDrawer(true)}
            onClose={() => setDrawer(false)}
          >
            <Box sx={{ my: 2, mx: 2 }}>
              <Stepper activeStep={activeStep} sx={{ pb: 2 }}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <form onSubmit={handleSubmit(_handleSubmit)}>
                {renderStepContent(activeStep)}
                <Grid container sx={{ mt: 2 }}>
                  <Grid item xs={6}>
                    {activeStep !== 0 && (
                      <Button disableElevation onClick={() => setActiveStep(activeStep - 1)}>
                        戻る
                      </Button>
                    )}
                  </Grid>
                  <Grid item xs={6} sx={{ textAlign: 'right' }}>
                    <Button
                      type='submit'
                      variant='contained'
                      disableElevation
                      color='secondary'
                      disabled={!isValid}
                    >
                      {activeStep === steps.length - 1 ? '保存' : '次へ'}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </SwipeableDrawer>
        </>
      )}
    </>
  )
}

export default Presenter
