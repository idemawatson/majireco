import { Box, Card, CardContent, CardHeader, Skeleton, Typography } from '@mui/material'
import { FC } from 'react'

const Loading: FC = () => {
  const gameCards = Array.from({ length: 10 }, (_, i) => i + 1).map((index) => (
    <Card key={index} elevation={0} sx={{ mb: 1 }}>
      <CardHeader title={<Skeleton variant='text' />}></CardHeader>
      <CardContent>
        <Typography variant='body1'>
          <Skeleton variant='text' />
        </Typography>
      </CardContent>
    </Card>
  ))
  return (
    <>
      <Box
        sx={{
          margin: 2,
        }}
      >
        {gameCards}
      </Box>
    </>
  )
}

export default Loading
