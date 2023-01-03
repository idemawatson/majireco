import { Box } from '@mui/material'
import { FC } from 'react'
import { useGames } from '@/hooks/useGames'
import GameListCard from '@/components/organisms/game/GameListCard'
import FixedFab from '@/components/uiParts/BaseFixedFab'
import { Add } from '@mui/icons-material'
import { useRouter } from 'next/router'

type Props = {}

const Presenter: FC<Props> = ({}) => {
  const { data } = useGames()
  const router = useRouter()

  const toGameCreate = () => router.push('/game')
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
        <FixedFab color='primary' aria-label='add' onClick={toGameCreate}>
          <Add />
        </FixedFab>
      </Box>
    </>
  )
}

export default Presenter
