import { Button } from '@mui/material'
import { FC, ReactNode } from 'react'

type Props = {
  onClick?: () => void
  submit?: boolean
  color: 'primary' | 'secondary' | 'error'
  disabled?: boolean
  size?: 'large' | 'medium' | 'small'
  sx?: any
  children: ReactNode
}

export const BaseButton: FC<Props> = ({
  onClick,
  submit = false,
  color,
  disabled,
  size,
  sx,
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
      sx={sx}
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
      sx={sx}
      onClick={onClick}
    >
      {children}
    </Button>
  )
}
