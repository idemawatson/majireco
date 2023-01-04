import { Button, Paper, Typography } from '@mui/material'
import { useRouter } from 'next/router'

const Error404: React.FC = () => {
  const router = useRouter()
  const toHome = () => {
    router.push('/games')
  }
  return (
    <Paper
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: 'primary.main',
      }}
    >
      <Typography variant='h1' sx={{ my: 1, color: 'primary.contrastText' }}>
        500
      </Typography>
      <Typography variant='h6' sx={{ my: 1, color: 'primary.contrastText' }}>
        サーバーエラーが発生しました
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
    </Paper>
  )
}

export default Error404
