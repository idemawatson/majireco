import { Paper } from '@mui/material'

import { FC } from 'react'
import CreateGameFormCard from '@/components/organisms/game/CreateGameFormCard'
import { ICreateGameForm } from '@/types/forms/CreateGameForm'

type Props = {
  submitForm: (data: ICreateGameForm) => void
}

const Presenter: FC<Props> = ({ submitForm }) => {
  return (
    <>
      <Paper
        sx={{
          margin: 2,
        }}
        elevation={0}
      >
        <CreateGameFormCard submitForm={submitForm} />
      </Paper>
    </>
  )
}

export default Presenter
