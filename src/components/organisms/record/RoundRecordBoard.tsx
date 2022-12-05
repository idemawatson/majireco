import { GetGameResponseDTO } from '@/usecases/GetGame/GetGameDto'
import { Grid, Paper, styled } from '@mui/material'
import { FC } from 'react'

const Header: FC<Pick<GetGameResponseDTO, 'belongingPlayers'>> = ({ belongingPlayers }) => {
  return (
    <>
      {belongingPlayers.map((bp) => (
        <Grid item xs={3} key={bp.playerId}>
          <Paper
            variant='outlined'
            square
            elevation={0}
            sx={{ textAlign: 'center', py: 2, fontWeight: 'bold', fontSize: '14px' }}
          >
            {bp.playerName.length <= 5 ? bp.playerName : `${bp.playerName.slice(0, 5)}`}
          </Paper>
        </Grid>
      ))}
    </>
  )
}

const PlusScore = styled('div')({ color: 'green' })
const MinusScore = styled('div')({ color: 'red' })

const Row: FC<{ records: { playerId: string; rank: number; score: number }[] }> = ({ records }) => {
  return (
    <>
      {records.map((record) => (
        <Grid item xs={3} key={record.playerId}>
          <Paper
            variant='outlined'
            square
            elevation={0}
            sx={{ textAlign: 'center', py: 2, fontSize: '24px' }}
          >
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

const Result: FC<Pick<GetGameResponseDTO, 'roundRecords'>> = ({ roundRecords }) => {
  const roundNum = Object.keys(roundRecords).length
  const totalResults = Object.values(roundRecords).reduce((previous, row) => {
    row.forEach((record) => {
      if (previous[record.playerId]) {
        previous[record.playerId].totalRank += record.rank
        previous[record.playerId].totalScore += record.score
      } else {
        previous[record.playerId] = { totalRank: record.rank, totalScore: record.score }
      }
    })
    return previous
  }, {} as { [playerId: string]: { totalScore: number; totalRank: number } })
  return (
    <>
      {Object.entries(totalResults).map(([playerId, result]) => (
        <Grid item xs={3} key={playerId}>
          <Paper
            variant='outlined'
            square
            elevation={0}
            sx={{ textAlign: 'center', py: 2, fontSize: '24px', fontWeight: 'bold' }}
          >
            {result.totalScore < 0 ? (
              <MinusScore>{`${result.totalScore}`}</MinusScore>
            ) : (
              <PlusScore>{`+${result.totalScore}`}</PlusScore>
            )}
          </Paper>
        </Grid>
      ))}
      {Object.entries(totalResults).map(([playerId, result]) => (
        <Grid item xs={3} key={playerId}>
          <Paper
            variant='outlined'
            square
            elevation={0}
            sx={{ textAlign: 'center', py: 2, fontSize: '24px', fontWeight: 'bold' }}
          >
            <div>{Math.round((result.totalRank / roundNum) * 100) / 100}</div>
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
        {Object.values(roundRecords).map((record, index) => (
          <Row records={record} key={index} />
        ))}
      </Grid>
      <Grid container sx={{ borderTop: 'solid' }}>
        <Result roundRecords={roundRecords} />
      </Grid>
    </>
  )
}

export default RoundRecordBoard
