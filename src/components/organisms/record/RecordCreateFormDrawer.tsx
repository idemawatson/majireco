import {
  Box,
  Button,
  Fab,
  Grid,
  Step,
  StepLabel,
  Stepper,
  styled,
  SwipeableDrawer,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { IRecordCreateForm, schema } from '@/types/forms/RecordCreateForm'
import { yupResolver } from '@hookform/resolvers/yup'
import calcRecordScores from '@/libs/calcRecordScores'
import { GAME_RULES_TYPE } from '@/libs/const'
import { GetGameResponseDTO } from '@/usecases/GetGame/GetGameDto'
import RecordScoreForm from './RecordScoreForm'
import RecordPointForm from './RecordPointForm'
import FixedFab from '@/components/uiParts/BaseFixedFab'
import { useNotification } from '@/components/uiParts/TheNotificationToast/hooks'

const steps = ['点数入力', 'スコア確認']

type Props = Pick<GetGameResponseDTO, 'belongingPlayers'> & {
  submitForm: (form: IRecordCreateForm) => void
  gameRule: GAME_RULES_TYPE
  checkIsCompleted: () => Promise<boolean>
}
const RecordCreateFormDrawer: FC<Props> = ({
  belongingPlayers,
  submitForm,
  gameRule,
  checkIsCompleted,
}) => {
  const [drawer, setDrawer] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const { showError } = useNotification()
  const playerIds = belongingPlayers.map((bp) => bp.playerId)
  const defaultValues = {
    p1Point: 0,
    p2Point: 0,
    p3Point: 0,
    p4Point: 0,
    p1Score: 0,
    p2Score: 0,
    p3Score: 0,
    p4Score: 0,
    player1: playerIds[0],
    player2: playerIds[1],
    player3: playerIds[2],
    player4: playerIds[3],
  }

  const openDrawer = async () => {
    if (await checkIsCompleted()) {
      setDrawer(true)
    } else {
      showError('既に完了済みのゲームです')
    }
  }

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <RecordPointForm players={belongingPlayers} control={control}></RecordPointForm>
      case 1:
        return (
          <RecordScoreForm
            players={belongingPlayers}
            control={control}
            addScore={addScore}
          ></RecordScoreForm>
        )
      default:
        return <div>Not Found</div>
    }
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
  const _handleSubmit = (form: IRecordCreateForm) => {
    if (activeStep === steps.length - 1) {
      submitForm(form)
      reset(defaultValues)
      setActiveStep(0)
      setDrawer(false)
    } else {
      const [score1, score2, score3, score4] = calcRecordScores(
        [
          { playerId: playerIds[0], point: getValues('p1Point') },
          { playerId: playerIds[1], point: getValues('p2Point') },
          { playerId: playerIds[2], point: getValues('p3Point') },
          { playerId: playerIds[3], point: getValues('p4Point') },
        ],
        gameRule,
      )
      setValue('p1Score', score1)
      setValue('p2Score', score2)
      setValue('p3Score', score3)
      setValue('p4Score', score4)
      setActiveStep(activeStep + 1)
    }
  }

  const addScore = (key: 'p1Score' | 'p2Score' | 'p3Score' | 'p4Score', addition: number) => {
    setValue(key, getValues(key) + addition)
  }

  return (
    <>
      <FixedFab color='primary' aria-label='add' onClick={openDrawer}>
        <AddIcon />
      </FixedFab>
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
  )
}

export default RecordCreateFormDrawer
