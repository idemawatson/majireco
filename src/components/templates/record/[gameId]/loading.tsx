import { Grid, Paper, Skeleton, Typography } from '@mui/material'
import React from 'react'

const Row = () => {
  return (
    <>
      {Array.from(Array(4).keys()).map((i) => (
        <Grid item xs={3} key={i}>
          <Paper
            variant='outlined'
            square
            elevation={0}
            sx={{ textAlign: 'center', py: 2, fontSize: '24pxs' }}
          >
            <Typography variant='body1' sx={{ px: 1 }}>
              <Skeleton variant='text' />
            </Typography>
          </Paper>
        </Grid>
      ))}
    </>
  )
}

export const Loading: React.FC = () => {
  return (
    <Paper
      sx={{
        my: 2,
        mx: 1,
      }}
      elevation={0}
    >
      <Grid container>
        {Array.from(Array(10).keys()).map((i) => (
          <Row key={i}></Row>
        ))}
      </Grid>
    </Paper>
  )
}
