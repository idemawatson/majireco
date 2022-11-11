import { Box, Typography } from '@mui/material'
import { FallbackProps } from 'react-error-boundary'
import axios from 'axios'

export const ErrorFallback: React.FC<FallbackProps> = ({ error }) => {
  if (axios.isAxiosError(error)) {
    const statusCode = error.response?.data?.statusCode as number
    const messageMap = new Map<number, string>([[404, 'ゲームが存在しません。URLが不正です。']])
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
          {messageMap.get(statusCode) || 'エラーが発生しました'}
        </Typography>
      </Box>
    )
  } else {
    return <div></div>
  }
}
