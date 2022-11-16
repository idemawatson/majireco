import { Card, CardContent, CardHeader, Grid, Paper, Skeleton, Typography } from '@mui/material'
import React from 'react'

export const Loading: React.FC = () => {
  return (
    <Paper
      sx={{
        margin: 2,
      }}
      elevation={0}
    >
      <Card elevation={0}>
        <CardHeader title='対局'>
          <Skeleton variant='text' />
        </CardHeader>
        <CardContent>
          <Grid container justifyContent='flex-end'>
            <Grid item xs={12}>
              <Typography variant='body1'>
                <Skeleton variant='text' />
              </Typography>
              <Typography variant='body1'>
                <Skeleton variant='text' />
              </Typography>
              <Typography variant='body1'>
                <Skeleton variant='text' />
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Paper>
  )
}
