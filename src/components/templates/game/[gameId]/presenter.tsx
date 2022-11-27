import { Paper } from '@mui/material'
import { useRouter } from 'next/router'
import { FC } from 'react'
import InputGameFormCard from '@/components/organisms/game/InputGameFormCard'
import { useGetGame } from '@/hooks/useGetGame'
import { IUpdateGameForm } from '@/types/forms/UpdateGameForm'
import RoundRecordBoard from '@/components/organisms/game/RoundRecordBoard'

type Props = {
  submitForm: (data: IUpdateGameForm) => void
}

const Presenter: FC<Props> = ({ submitForm }) => {
  const router = useRouter()
  const { data, mutate } = useGetGame(router.query.gameId as string)
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
          <div>
            <RoundRecordBoard />
          </div>
        )}
      </Paper>
    </>
  )
}

export default Presenter
