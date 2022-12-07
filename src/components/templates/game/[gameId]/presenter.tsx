import { Paper } from '@mui/material'
import { useRouter } from 'next/router'
import { FC } from 'react'
import InputGameFormCard from '@/components/organisms/game/GameUpdateFormCard'
import { useGame } from '@/hooks/useGame'
import { IUpdateGameForm } from '@/types/forms/GameUpdateForm'

type Props = {
  submitForm: (data: IUpdateGameForm) => void
}

const Presenter: FC<Props> = ({ submitForm }) => {
  const router = useRouter()
  const { data, mutate } = useGame(router.query.gameId as string)
  const isStarted = data?.started

  return (
    <>
      <Paper
        sx={{
          my: 2,
          mx: 1,
        }}
        elevation={0}
      >
        {!isStarted ? (
          data && <InputGameFormCard game={data} submitForm={submitForm} refresh={mutate} />
        ) : (
          <div>開始済みのゲームです。</div>
        )}
      </Paper>
    </>
  )
}

export default Presenter
