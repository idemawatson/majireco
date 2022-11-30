import { Paper } from '@mui/material'
import { useRouter } from 'next/router'
import { FC } from 'react'
import InputGameFormCard from '@/components/organisms/game/InputGameFormCard'
import { useGetGame } from '@/hooks/useGetGame'
import RoundRecordBoard from '@/components/organisms/game/RoundRecordBoard'

type Props = {}

const Presenter: FC<Props> = () => {
  const router = useRouter()
  const { data } = useGetGame(router.query.gameId as string)

  return (
    <>
      <Paper
        sx={{
          my: 2,
          mx: 1,
        }}
        elevation={0}
      >
        {data && (
          <RoundRecordBoard
            belongingPlayers={data.belongingPlayers}
            roundRecords={data.roundRecords}
          />
        )}
      </Paper>
    </>
  )
}

export default Presenter
