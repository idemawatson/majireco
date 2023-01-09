import ChevronRight from '@mui/icons-material/ChevronRight'
import { Card, CardActionArea, CardContent, CardHeader, Typography } from '@mui/material'
import { GameRate, GameRule } from '@prisma/client'
import dayjs from 'dayjs'
import { FC } from 'react'
import { getRateText } from '@/libs/gameRate'
import { getRuleText } from '@/libs/gameRule'

type Props = {
  gameId: string
  playedAt: string
  started: boolean
  completed: boolean
  players: string[]
  rule: GameRule
  rate: GameRate
}

const GameListCard: FC<Props> = (props) => {
  const getStatusText = (started: boolean, completed: boolean) => {
    if (started === true) {
      return completed ? '終了済み' : '開始済み'
    } else return '開始待ち'
  }
  const getToHref = (started: boolean, gameId: string) => {
    return started ? `/record/${gameId}` : `game/${gameId}`
  }
  const playerNames = () => {
    return props.players.map((player, index) => (
      <Typography key={index} variant='body1'>
        {player}
      </Typography>
    ))
  }

  return (
    <Card key={props.gameId} elevation={0} sx={{ mb: 1 }}>
      <CardActionArea href={getToHref(props.started, props.gameId)}>
        <CardHeader
          title={dayjs(props.playedAt).format('YYYY年MM月DD日 HH:mm')}
          subheader={getStatusText(props.started, props.completed)}
        ></CardHeader>
        <CardContent sx={{ pt: 0 }}>{playerNames()}</CardContent>
      </CardActionArea>
    </Card>
  )
}

export default GameListCard
