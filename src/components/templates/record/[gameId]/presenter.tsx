import { Card, CardContent, CardHeader, Paper, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { FC } from 'react'
import RecordMenuSpeedDial from '@/components/organisms/record/RecordMenuSpeedDial'
import RecordTransitionChart from '@/components/organisms/record/RecordTransitionChart'
import RoundRecordBoard from '@/components/organisms/record/RoundRecordBoard'
import { useGame } from '@/hooks/useGame'
import { IGameMemoForm } from '@/types/forms/GameMemoForm'
import { IRecordCreateForm } from '@/types/forms/RecordCreateForm'

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
      <RecordMenuSpeedDial createRecord={createRecord} updateMemo={updateMemo} endGame={endGame} />
    </>
  )
}

export default Presenter
