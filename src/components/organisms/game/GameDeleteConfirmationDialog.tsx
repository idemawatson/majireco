import { DeleteForever } from '@mui/icons-material'
import { Typography } from '@mui/material'
import { FC, useState } from 'react'
import { BaseButton } from '@/components/uiParts/BaseButton'
import BaseConfirmationDialog from '@/components/uiParts/BaseConfirmationDialog'

type Props = {
  deleteGame: () => Promise<void>
}

const GameDeleteConfirmationDialog: FC<Props> = ({ deleteGame }) => {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  const handleAgree = async () => {
    await deleteGame()
    close()
  }
  return (
    <>
      <BaseButton onClick={() => setOpen(true)} color='error' sx={{ mx: 1 }}>
        <DeleteForever />
      </BaseButton>
      <BaseConfirmationDialog
        open={open}
        title='対局削除'
        handleClose={close}
        handleAgree={handleAgree}
      >
        <Typography variant='body1'>対局を削除します。よろしいですか？</Typography>
      </BaseConfirmationDialog>
    </>
  )
}

export default GameDeleteConfirmationDialog
