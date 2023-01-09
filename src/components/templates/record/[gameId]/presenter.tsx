import { useUser } from '@auth0/nextjs-auth0'
import { Box, Card, CardContent, CardHeader, Paper, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { FC } from 'react'
import RoundRecordBoard from '@/components/organisms/record/RoundRecordBoard'
import { BaseButton } from '@/components/uiParts/BaseButton'
import { useGame } from '@/hooks/useGame'
import { IRecordCreateForm } from '@/types/forms/RecordCreateForm'
import RecordMenuSpeedDial from '@/components/organisms/record/RecordMenuSpeedDial'
import { IGameMemoForm } from '@/types/forms/GameMemoForm'

type Props = {
  createRecord: (form: IRecordCreateForm) => void
  updateMemo: (form: IGameMemoForm) => void
  endGame: () => void
}

const Presenter: FC<Props> = ({ createRecord, updateMemo, endGame }) => {
  const router = useRouter()
  const { data } = useGame(router.query.gameId as string)
  if (!data) return <></>

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
      <Card sx={{ my: 2, mx: 2 }} elevation={0}>
        <CardHeader title='対局メモ'></CardHeader>
        <CardContent>
          <Typography>{data.memo}</Typography>
        </CardContent>
      </Card>
      <RecordMenuSpeedDial createRecord={createRecord} updateMemo={updateMemo} endGame={endGame} />
    </>
  )
}

export default Presenter
