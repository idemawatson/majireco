import { BaseButton } from '@/components/uiParts/BaseButton'
import { getRateText } from '@/libs/gameRate'
import { getRuleText } from '@/libs/gameRule'
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from '@mui/material'
import { GameRate, GameRule } from '@prisma/client'
import ChevronRight from '@mui/icons-material/ChevronRight'
import dayjs from 'dayjs'
import { FC } from 'react'

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

  return (
    <Card key={props.gameId} elevation={0} sx={{ mb: 1 }}>
      <CardActionArea href={getToHref(props.started, props.gameId)}>
        <CardHeader
          title={dayjs(props.playedAt).format('YYYY年MM月DD日 HH:mm')}
          subheader={getStatusText(props.started, props.completed)}
        ></CardHeader>
        <CardContent sx={{ pt: 0 }}>
          <Typography variant='body1'>{props.players.join(',')}</Typography>
          <Typography variant='body1'>ルール: {getRuleText(props.rule)}</Typography>
          <Typography variant='body1'>レート: {getRateText(props.rate)}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default GameListCard
