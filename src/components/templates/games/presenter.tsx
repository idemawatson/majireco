import dayjs from 'dayjs'
import { Box, Card, CardContent, CardHeader, Typography } from '@mui/material'
import { FC } from 'react'
import { useGames } from '@/hooks/useGames'
import gameRule from '@/libs/gameRule'
import gameRate from '@/libs/gameRate'

type Props = {}

const Presenter: FC<Props> = ({}) => {
  const { data } = useGames()
  const gameCards =
    data && data.games.length ? (
      data.games.map((game) => {
        const playedAt = dayjs(game.playedAt).format('YYYY-MM-DD HH:mm')
        return (
          <Card key={game.gameId} elevation={0} sx={{ mb: 1 }}>
            <CardHeader
              title={playedAt}
              subheader={game.started ? '開始済み' : '開始待ち'}
            ></CardHeader>
            <CardContent sx={{ pt: 0 }}>
              <Typography variant='body1'>{game.players.join(',')}</Typography>
              <Typography variant='body1'>ルール: {gameRule.getRuleText(game.rule)}</Typography>
              <Typography variant='body1'>レート: {gameRate.getRateText(game.rate)}</Typography>
            </CardContent>
          </Card>
        )
      })
    ) : (
      <div>ゲームがありません。</div>
    )
  return (
    <>
      <Box
        sx={{
          margin: 2,
        }}
      >
        {gameCards}
      </Box>
    </>
  )
}

export default Presenter
