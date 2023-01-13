import { Typography } from '@mui/material'
import { FC } from 'react'
import BaseConfirmationDialog from '@/components/uiParts/BaseConfirmationDialog'

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
  deleteRecord: () => void
}

const RecordDeleteConfirmationDialog: FC<Props> = ({ open, setOpen, deleteRecord }) => {
  const close = () => setOpen(false)
  const handleAgree = () => {
    deleteRecord()
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
        <Typography variant='body1'>半荘データを削除します。よろしいですか？</Typography>
      </BaseConfirmationDialog>
    </>
  )
}

export default RecordDeleteConfirmationDialog
