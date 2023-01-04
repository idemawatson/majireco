import { Fab, styled } from '@mui/material'

const FixedFab = styled(Fab)(() => ({
  margin: 0,
  top: 'auto',
  right: 20,
  bottom: 80,
  left: 'auto',
  position: 'fixed',
  zIndex: 900,
}))

export default FixedFab
