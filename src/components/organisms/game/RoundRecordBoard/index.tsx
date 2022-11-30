import { GetGameResponseDTO } from '@/usecases/GetGame/GetGameDto'
import { Grid, Paper, styled } from '@mui/material'
import { FC } from 'react'

const Header: FC<Pick<GetGameResponseDTO, 'belongingPlayers'>> = ({ belongingPlayers }) => {
  return (
    <>
      {belongingPlayers.map((bp) => (
        <Grid item xs={3} key={bp.playerId}>
          <Paper variant='outlined' square elevation={0} sx={{ textAlign: 'center' }}>
            {bp.playerName.length <= 3 ? bp.playerName : `${bp.playerName.slice(0, 3)}...`}
          </Paper>
        </Grid>
      ))}
    </>
  )
}

const Row: FC<{ records: { playerId: string; rank: Number; score: Number }[] }> = ({ records }) => {
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

type Props = Pick<GetGameResponseDTO, 'belongingPlayers' | 'roundRecords'>

const RoundRecordBoard: FC<Props> = ({ belongingPlayers, roundRecords }) => {
  return (
    <>
      <Grid container>
        <Header belongingPlayers={belongingPlayers} />
        {Object.values(roundRecords).map((record) => (
          <Row records={record} />
        ))}
      </Grid>
    </>
  )
}

export default RoundRecordBoard
