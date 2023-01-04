import { useUser } from '@auth0/nextjs-auth0'
import { Box, Paper, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { useGame } from '@/hooks/useGame'
import RoundRecordBoard from '@/components/organisms/record/RoundRecordBoard'
import { IRecordCreateForm } from '@/types/forms/RecordCreateForm'
import { BaseButton } from '@/components/uiParts/BaseButton'
import RecordCreateFormDrawer from '@/components/organisms/record/RecordCreateFormDrawer'
import dayjs from 'dayjs'

type Props = {
  submitForm: (form: IRecordCreateForm) => void
  handleOnClickEndGame: () => void
}

const Presenter: FC<Props> = ({ submitForm, handleOnClickEndGame }) => {
  const router = useRouter()
  const { user } = useUser()
  const { data, mutate } = useGame(router.query.gameId as string)
  if (!data) return <></>

  const hasRecord = Object.keys(data.roundRecords).length > 0
  const isOwner = data.owner.id === user?.sub
  const checkIsCompleted = async () => {
    await mutate()
    return !!data.completed
  }

  return (
    <>
      <Paper sx={{ mx: 2, my: 2, px: 1, py: 1 }} elevation={0}>
        <Typography>プレイ日: {dayjs(data.playedAt).format('YYYY-MM-DD')}</Typography>
        <Typography>作成者: {data.owner.name}</Typography>
      </Paper>
      <Paper
        sx={{
          my: 2,
          mx: 2,
        }}
        elevation={0}
      >
        <RoundRecordBoard
          belongingPlayers={data.belongingPlayers}
          roundRecords={data.roundRecords}
        />
      </Paper>
      {!data.completed === true && (
        <>
          <Box sx={{ mx: 2, textAlign: 'start' }}>
            {isOwner && (
              <BaseButton color='secondary' onClick={handleOnClickEndGame} disabled={!hasRecord}>
                対局を終了
              </BaseButton>
            )}
          </Box>
          <RecordCreateFormDrawer
            belongingPlayers={data.belongingPlayers}
            submitForm={submitForm}
            gameRule={data.rule}
            checkIsCompleted={checkIsCompleted}
          />
        </>
      )}
    </>
  )
}

export default Presenter
