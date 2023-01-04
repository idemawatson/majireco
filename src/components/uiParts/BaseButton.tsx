import { Button } from '@mui/material'
import { FC, ReactNode } from 'react'

type Props = {
  onClick: () => void
  submit?: boolean
  color: 'primary' | 'secondary'
  disabled?: boolean
  size?: 'large' | 'medium' | 'small'
  children: ReactNode
}

export const BaseButton: FC<Props> = ({
  onClick,
  submit = false,
  color,
  disabled,
  size,
  children,
}) => {
  return submit ? (
    <Button
      type='submit'
      variant='contained'
      disableElevation
      color={color}
      disabled={disabled}
      size={size}
      onClick={onClick}
    >
      {children}
    </Button>
  ) : (
    <Button
      variant='contained'
      disableElevation
      color={color}
      disabled={disabled}
      size={size}
      onClick={onClick}
    >
      {children}
    </Button>
  )
}
