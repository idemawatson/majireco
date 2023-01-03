import { Paper } from '@mui/material'
import { FC, ReactNode } from 'react'

const BaseDisplayCard: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Paper
      sx={{
        py: 4,
        textAlign: 'center',
        lineHeight: '1.5',
        borderRadius: '16px',
        backgroundColor: 'primary.main',
        color: 'primary.contrastText',
      }}
      elevation={0}
    >
      {children}
    </Paper>
  )
}

export default BaseDisplayCard
