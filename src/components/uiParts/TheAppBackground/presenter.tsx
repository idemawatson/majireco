import { Box } from '@mui/material'
import { grey } from '@mui/material/colors'
import { ReactNode, FC } from 'react'

const Presenter: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Box
      sx={{
        height: '100vh',
        overflow: 'auto',
        bgcolor: grey[200],
      }}
    >
      {children}
    </Box>
  )
}

export default Presenter
