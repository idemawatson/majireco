import { Box, Button, Typography } from '@mui/material'
import { useRouter } from 'next/router'

const Error404: React.FC = () => {
  const router = useRouter()
  const toHome = () => {
    router.push('/game')
  }
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: 'primary.main',
      }}
    >
      <Typography variant='h1' sx={{ my: 1, color: 'white' }}>
        404
      </Typography>
      <Typography variant='h6' sx={{ my: 1, color: 'white' }}>
        ページが存在しません
      </Typography>
      <Button
        variant='contained'
        disableElevation
        sx={{ my: 1 }}
        color='secondary'
        onClick={toHome}
      >
        ホームに戻る
      </Button>
    </Box>
  )
}

export default Error404
