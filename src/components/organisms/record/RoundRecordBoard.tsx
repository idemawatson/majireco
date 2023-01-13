import { Grid, Paper, Stack, styled } from '@mui/material'
import { FC, ReactNode, useState } from 'react'
import sliceText from '@/libs/sliceText'
import { GetGameResponseDTO } from '@/usecases/GetGame/GetGameDto'
import { Clear } from '@mui/icons-material'
import { useRouter } from 'next/router'
import { useUser } from '@auth0/nextjs-auth0'
import { useGame } from '@/hooks/useGame'
import RecordDeleteConfirmationDialog from './RecordDeleteConfirmationDialog'

const FixedClear = styled(Clear)(({ theme }) => ({
  margin: 0,
  top: 1,
  left: 1,
  color: theme.palette.secondary.main,
  opacity: '0.5',
  position: 'absolute',
}))

const Column: FC<{
  children: ReactNode
  fontSize?: string
  backgroundColor?: string
  color?: string
}> = ({ children, fontSize = '14px', backgroundColor, color }) => {
  return (
    <Grid item xs={12 / 5}>
      <Paper
        variant='outlined'
        square
        elevation={0}
        component={Stack}
        direction='column'
        justifyContent='center'
        sx={{
          textAlign: 'center',
          py: 2,
          fontSize,
          fontWeight: 'bold',
          backgroundColor,
          color,
          height: '100%',
          position: 'relative',
        }}
      >
        {children}
      </Paper>
    </Grid>
  )
}

const Header: FC<Pick<GetGameResponseDTO, 'belongingPlayers'>> = ({ belongingPlayers }) => {
  return (
    <>
      <Column fontSize='12px' backgroundColor='primary.main' color='primary.contrastText'>
        プレイヤー
      </Column>
      {belongingPlayers.map((bp) => (
        <Column key={bp.playerId} backgroundColor='primary.main' color='primary.contrastText'>
          {sliceText(bp.playerName, 5)}
        </Column>
      ))}
    </>
  )
}

const PlusScore = styled('div')({ color: 'green' })
const MinusScore = styled('div')({ color: 'red' })

const Row: FC<{
  records: { playerId: string; rank: number; score: number }[]
  num: number
  completed: boolean
  isOwner: boolean
  onClickDelete: () => void
}> = ({ records, num, isOwner, completed, onClickDelete }) => {
  return (
    <>
      <Column fontSize='20px'>
        {num}
        {isOwner && !completed && <FixedClear onClick={onClickDelete}></FixedClear>}
      </Column>
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
      <Column fontSize='20px'>合計</Column>
      {Object.entries(totalResults).map(([playerId, result]) => (
        <Column key={playerId} fontSize='24px'>
          {result.totalScore < 0 ? (
            <MinusScore>{`${result.totalScore}`}</MinusScore>
          ) : (
            <PlusScore>{`+${result.totalScore}`}</PlusScore>
          )}
        </Column>
      ))}
      <Column fontSize='12px'>平均着順</Column>
      {Object.entries(totalResults).map(([playerId, result]) => (
        <Column key={playerId} fontSize='24px'>
          <div>{Math.round((result.totalRank / roundNum) * 100) / 100}</div>
        </Column>
      ))}
    </>
  )
}

type Props = {
  deleteRecord: (recordId: string) => void
}

const RoundRecordBoard: FC<Props> = ({ deleteRecord }) => {
  const router = useRouter()
  const { user } = useUser()
  const { data } = useGame(router.query.gameId as string)
  const [recordDeleteOpen, setRecordDeleteOpen] = useState(false)
  const [deleteRoundId, setDeleteRoundId] = useState('')
  if (!data) return <></>
  const isOwner = data.owner.id === user?.sub

  return (
    <>
      <Grid container>
        <Header belongingPlayers={data.belongingPlayers} />
        <Grid container sx={{ overflowY: 'auto', maxHeight: '40vh' }}>
          {Object.entries(data.roundRecords).map(([roundId, record], index) => (
            <Row
              records={record}
              num={index + 1}
              key={index}
              onClickDelete={() => {
                setDeleteRoundId(roundId)
                setRecordDeleteOpen(true)
              }}
              completed={data.completed}
              isOwner={isOwner}
            />
          ))}
        </Grid>
      </Grid>
      {Object.keys(data.roundRecords).length > 0 && (
        <Grid container sx={{ borderTop: 'solid' }}>
          <Result roundRecords={data.roundRecords} />
        </Grid>
      )}
      <RecordDeleteConfirmationDialog
        open={recordDeleteOpen}
        setOpen={setRecordDeleteOpen}
        deleteRecord={() => deleteRecord(deleteRoundId)}
      />
    </>
  )
}

export default RoundRecordBoard
