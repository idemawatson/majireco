import { Fab, Paper, styled } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useRouter } from 'next/router'
import { FC } from 'react'
import InputGameFormCard from '@/components/organisms/game/InputGameFormCard'
import { useGetGame } from '@/hooks/useGetGame'
import RoundRecordBoard from '@/components/organisms/game/RoundRecordBoard'
import RecordCreateFormDrawer from '@/components/organisms/record/RecordCreateFormDrawer'

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
      <RecordCreateFormDrawer></RecordCreateFormDrawer>
    </>
  )
}

export default Presenter
