import { Grid, Paper, styled, Typography } from '@mui/material'

const NumberColumn = ({ children }: { children: string }) => {
  const slicedString = children.length <= 3 ? children : `${children.slice(0, 3)}...`
  return (
    <Paper variant='outlined' square elevation={0} sx={{ textAlign: 'center' }}>
      {slicedString}
    </Paper>
  )
}

const Header = () => {
  const names = ['井手拓海', 'テスト太郎', 'テスト次郎', 'テスト三郎']
  return (
    <>
      {names.map((name) => (
        <Grid item xs={3} key={name}>
          <Paper variant='outlined' square elevation={0} sx={{ textAlign: 'center' }}>
            {name.length <= 3 ? name : `${name.slice(0, 3)}...`}
          </Paper>
        </Grid>
      ))}
    </>
  )
}

const Row = () => {
  const points = ['+53', '+8', '-17', '-44']
  const PlusPoint = styled('div')({ color: 'green' })
  const MinusPoint = styled('div')({ color: 'red' })
  return (
    <>
      {points.map((point, index) => (
        <Grid item xs={3} key={index}>
          <Paper variant='outlined' square elevation={0} sx={{ textAlign: 'center' }}>
            {point.startsWith('-') ? (
              <MinusPoint>{point}</MinusPoint>
            ) : (
              <PlusPoint>{point}</PlusPoint>
            )}
          </Paper>
        </Grid>
      ))}
    </>
  )
}

const RoundRecordBoard = () => {
  return (
    <>
      <Grid container>
        <Header />
        <Row></Row>
      </Grid>
    </>
  )
}

export default RoundRecordBoard
