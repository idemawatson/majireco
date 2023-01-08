import { Card, CardContent, CardHeader, Skeleton, Typography } from '@mui/material'
import { FC } from 'react'

const PlayerInfoLoader: FC = () => {
  return (
    <>
      <Card elevation={0}>
        <CardHeader title='プレイヤー設定' />
        <CardContent>
          <Typography variant='body1'>
            <Skeleton variant='text' />
          </Typography>
        </CardContent>
      </Card>
    </>
  )
}

export default PlayerInfoLoader
