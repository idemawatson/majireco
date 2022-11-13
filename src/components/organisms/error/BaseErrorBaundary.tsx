import { Box, Typography } from '@mui/material'

type Props = {
  statusCode: number
  message: string
}

const BaseErrorBoundary: React.FC<Props> = ({ statusCode, message }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#eee',
      }}
    >
      <Typography variant='h1' style={{ color: 'black' }}>
        {statusCode}
      </Typography>
      <Typography variant='subtitle1' style={{ color: 'black' }}>
        {message}
      </Typography>
    </Box>
  )
}

export default BaseErrorBoundary
