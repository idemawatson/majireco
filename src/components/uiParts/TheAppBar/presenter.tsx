import { Button } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { FC } from 'react'

const Presenter: FC<{ handleLogout: () => void }> = ({ handleLogout }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='fixed' sx={{ backgroundColor: 'primary' }}>
        <Toolbar variant='dense'>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Majireco
          </Typography>
          <Button onClick={handleLogout} color='inherit'>
            ログアウト
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Presenter
