import { Box } from '@mui/material'
import { FC } from 'react'
import { useGames } from '@/hooks/useGames'
import GameListCard from '@/components/organisms/game/GameListCard'

type Props = {}

const Presenter: FC<Props> = ({}) => {
  const { data } = useGames()

  const gameCards =
    data && data.games.length ? (
      data.games.map((game) => <GameListCard {...game}></GameListCard>)
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
