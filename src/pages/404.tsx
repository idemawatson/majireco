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
        backgroundColor: 'blue',
      }}
    >
      <Typography variant='h1' style={{ color: 'white' }} sx={{ my: 1 }}>
        404
      </Typography>
      <Typography variant='h6' style={{ color: 'white' }} sx={{ my: 1 }}>
        ページが存在しません
      </Typography>
      <Button variant='contained' disableElevation sx={{ my: 1 }} onClick={toHome}>
        ホームに戻る
      </Button>
    </Box>
  )
}

export default Error404
