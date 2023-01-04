import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { FC, ReactNode } from 'react'
import { BaseButton } from './BaseButton'

type Props = {
  open: boolean
  title: string
  handleClose: () => void
  handleAgree: () => void
  children: ReactNode
}
const BaseConfirmationDialog: FC<Props> = ({ open, title, children, handleClose, handleAgree }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>キャンセル</Button>
        <BaseButton color='primary' onClick={handleAgree}>
          OK
        </BaseButton>
      </DialogActions>
    </Dialog>
  )
}

export default BaseConfirmationDialog
