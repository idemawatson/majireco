import { Box, Card, CardContent, CardHeader } from '@mui/material'

import { FC } from 'react'
import { useGames } from '@/hooks/useGames'

type Props = {}

const Presenter: FC<Props> = ({}) => {
  const { data } = useGames()
  const gameCards = data?.games.map((game) => (
    <Card key={game.gameId} elevation={0} sx={{ mb: 1 }}>
      <CardHeader title={game.playedAt}></CardHeader>
      <CardContent>{game.players.join(',')}</CardContent>
    </Card>
  ))
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
