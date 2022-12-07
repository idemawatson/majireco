import { Button } from '@mui/material'
import { FC, ReactNode } from 'react'

type Props = {
  onClick: () => void
  submit?: boolean
  color: 'primary' | 'secondary'
  children: ReactNode
}

export const BaseButton: FC<Props> = ({ onClick, submit = false, color, children }) => {
  return submit ? (
    <Button variant='contained' disableElevation color={color} type='submit' onClick={onClick}>
      {children}
    </Button>
  ) : (
    <Button variant='contained' disableElevation color={color} onClick={onClick}>
      {children}
    </Button>
  )
}
