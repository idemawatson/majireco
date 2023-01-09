import { Typography } from '@mui/material'
import { FC } from 'react'
import BaseConfirmationDialog from '@/components/uiParts/BaseConfirmationDialog'

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
  endGame: () => void
}

const GameEndConfirmationDialog: FC<Props> = ({ open, setOpen, endGame }) => {
  const close = () => setOpen(false)
  const handleAgree = () => {
    endGame()
    close()
  }
  return (
    <>
      <BaseConfirmationDialog
        open={open}
        title='対局終了'
        handleClose={close}
        handleAgree={handleAgree}
      >
        <Typography variant='body1'>対局を終了します。よろしいですか？</Typography>
      </BaseConfirmationDialog>
    </>
  )
}

export default GameEndConfirmationDialog
