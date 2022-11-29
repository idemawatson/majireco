import { GetGameResponseDTO } from '@/usecases/GetGame/GetGameDto'
import { Grid, Paper, styled } from '@mui/material'
import { FC } from 'react'

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

type Props = Pick<GetGameResponseDTO, 'belongingPlayers' | 'roundRecords'>

const Row: FC<{ records: { playerId: string; rank: Number; score: Number }[] }> = ({ records }) => {
  // const points = ['+53', '+8', '-17', '-44']
  const PlusScore = styled('div')({ color: 'green' })
  const MinusScore = styled('div')({ color: 'red' })
  return (
    <>
      {records.map((record) => (
        <Grid item xs={3} key={record.playerId}>
          <Paper variant='outlined' square elevation={0} sx={{ textAlign: 'center' }}>
            {record.score < 0 ? (
              <MinusScore>{`${record.score}`}</MinusScore>
            ) : (
              <PlusScore>{`+${record.score}`}</PlusScore>
            )}
          </Paper>
        </Grid>
      ))}
    </>
  )
}

const RoundRecordBoard: FC<Props> = ({ belongingPlayers, roundRecords }) => {
  return (
    <>
      <Grid container>
        <Header />
        {Object.values(roundRecords).map((record) => (
          <Row records={record} />
        ))}
      </Grid>
    </>
  )
}

export default RoundRecordBoard
