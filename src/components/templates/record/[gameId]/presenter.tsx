import { useUser } from '@auth0/nextjs-auth0'
import { Card, CardContent, CardHeader, Paper, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { FC } from 'react'
import RecordMenuSpeedDial from '@/components/organisms/record/RecordMenuSpeedDial'
import RecordTransitionChart from '@/components/organisms/record/RecordTransitionChart'
import RoundRecordBoard from '@/components/organisms/record/RoundRecordBoard'
import { useLoading } from '@/components/uiParts/TheLoading/hooks'
import { useNotification } from '@/components/uiParts/TheNotificationToast/hooks'
import { useGame } from '@/hooks/useGame'
import restClient from '@/libs/restClient'
import { IGameMemoForm } from '@/types/forms/GameMemoForm'
import { IRecordCreateForm } from '@/types/forms/RecordCreateForm'

type Props = {
  createRecord: (form: IRecordCreateForm) => void
  updateMemo: (form: IGameMemoForm) => void
  endGame: () => void
}

const Presenter: FC<Props> = ({ createRecord, updateMemo, endGame }) => {
  const router = useRouter()
  const { user } = useUser()
  const { data, mutate } = useGame(router.query.gameId as string)
  const { showLoading, hideLoading } = useLoading()
  const { showSuccess, showError } = useNotification()

  if (!data) return <></>
  const isJoined = data.belongingPlayers.some((player) => player.playerId === user?.sub)
  const isPublic = router.query.public === 'true'
  if (!isPublic && !isJoined) {
    router.push('/404')
    return <></>
  }

  const deleteRecord = async (roundId: string) => {
    try {
      showLoading()
      await restClient.delete(`/record?roundId=${roundId}`)
      showSuccess('削除しました')
      mutate()
    } catch (err) {
      console.error(err)
      showError('削除できませんでした')
    } finally {
      hideLoading()
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
        <RoundRecordBoard deleteRecord={deleteRecord} />
      </Paper>
      <Card sx={{ my: 2, mx: 2 }} elevation={0}>
        <CardHeader title='対局メモ'></CardHeader>
        <CardContent>
          <Typography>{data.memo}</Typography>
        </CardContent>
      </Card>
      <Card
        sx={{
          mx: 2,
          my: 2,
          mb: 10,
        }}
        elevation={0}
      >
        <CardHeader title='成績推移'></CardHeader>
        <CardContent>
          <RecordTransitionChart></RecordTransitionChart>
        </CardContent>
      </Card>
      {!isPublic && (
        <RecordMenuSpeedDial
          createRecord={createRecord}
          updateMemo={updateMemo}
          endGame={endGame}
        />
      )}
    </>
  )
}

export default Presenter
