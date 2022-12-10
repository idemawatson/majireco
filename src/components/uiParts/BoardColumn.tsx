import { Grid, Paper } from '@mui/material'
import { FC, ReactNode } from 'react'

const BoardColumn: FC<{ children: ReactNode; fontSize: string }> = ({ children, fontSize }) => {
  return (
    <Grid item xs={3}>
      <Paper
        variant='outlined'
        square
        elevation={0}
        sx={{ textAlign: 'center', py: 2, fontSize, fontWeight: 'bold' }}
      >
        {children}
      </Paper>
    </Grid>
  )
}

export default BoardColumn
