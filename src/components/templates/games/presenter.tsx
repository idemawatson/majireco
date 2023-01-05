import { Add } from '@mui/icons-material'
import { Box } from '@mui/material'
import { useRouter } from 'next/router'
import { FC } from 'react'
import GameListCard from '@/components/organisms/game/GameListCard'
import FixedFab from '@/components/uiParts/BaseFixedFab'
import { useGames } from '@/hooks/useGames'

type Props = {}

const Presenter: FC<Props> = ({}) => {
  const { data } = useGames()
  const router = useRouter()

  const toGameCreate = () => router.push('/game')
  const gameCards =
    data && data.games.length ? (
      data.games.map((game) => <GameListCard {...game} key={game.gameId}></GameListCard>)
    ) : (
      <div>対局がありません。</div>
    )
  return (
    <>
      <Box
        sx={{
          margin: 2,
        }}
      >
        {gameCards}
        <FixedFab color='primary' aria-label='add' onClick={toGameCreate}>
          <Add />
        </FixedFab>
      </Box>
    </>
  )
}

export default Presenter
