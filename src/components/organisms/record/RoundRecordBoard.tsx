import { Grid, Paper, styled } from '@mui/material'
import { FC, ReactNode } from 'react'
import { GetGameResponseDTO } from '@/usecases/GetGame/GetGameDto'

const Column: FC<{
  children: ReactNode
  fontSize: string
  backgroundColor?: string
  color?: string
}> = ({ children, fontSize, backgroundColor, color }) => {
  return (
    <Grid item xs={3}>
      <Paper
        variant='outlined'
        square
        elevation={0}
        sx={{ textAlign: 'center', py: 2, fontSize, fontWeight: 'bold', backgroundColor, color }}
      >
        {children}
      </Paper>
    </Grid>
  )
}

const Header: FC<Pick<GetGameResponseDTO, 'belongingPlayers'>> = ({ belongingPlayers }) => {
  return (
    <>
      {belongingPlayers.map((bp) => (
        <Column
          fontSize='14px'
          key={bp.playerId}
          backgroundColor='primary.main'
          color='primary.contrastText'
        >
          {bp.playerName.length <= 5 ? bp.playerName : `${bp.playerName.slice(0, 5)}`}
        </Column>
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
        <Column fontSize='20px' key={record.playerId}>
          {record.score < 0 ? (
            <MinusScore>{`${record.score}`}</MinusScore>
          ) : (
            <PlusScore>{`+${record.score}`}</PlusScore>
          )}
        </Column>
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
        <Column key={playerId} fontSize='24px'>
          {result.totalScore < 0 ? (
            <MinusScore>{`${result.totalScore}`}</MinusScore>
          ) : (
            <PlusScore>{`+${result.totalScore}`}</PlusScore>
          )}
        </Column>
      ))}
      {Object.entries(totalResults).map(([playerId, result]) => (
        <Column key={playerId} fontSize='24px'>
          <div>{Math.round((result.totalRank / roundNum) * 100) / 100}</div>
        </Column>
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
