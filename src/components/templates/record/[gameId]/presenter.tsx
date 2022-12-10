import { Box, Paper, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { useGame } from '@/hooks/useGame'
import RoundRecordBoard from '@/components/organisms/record/RoundRecordBoard'
import { IRecordCreateForm } from '@/types/forms/RecordCreateForm'
import { BaseButton } from '@/components/uiParts/BaseButton'
import RecordCreateFormDrawer from '@/components/organisms/record/RecordCreateFormDrawer'
import dayjs from 'dayjs'

type Props = {
  submitForm: (form: IRecordCreateForm) => void
  handleOnClickEndGame: () => void
}

const Presenter: FC<Props> = ({ submitForm, handleOnClickEndGame }) => {
  const router = useRouter()
  const { data } = useGame(router.query.gameId as string)
  if (!data) return <></>
  return (
    <>
      <Paper sx={{ mx: 2, my: 2, px: 1, py: 1 }} elevation={0}>
        <Typography>プレイ日: {dayjs(data.playedAt).format('YYYY-MM-DD')}</Typography>
        <Typography>作成者: {data.owner.name}</Typography>
      </Paper>
      <Paper
        sx={{
          my: 2,
          mx: 2,
        }}
        elevation={0}
      >
        <RoundRecordBoard
          belongingPlayers={data.belongingPlayers}
          roundRecords={data.roundRecords}
        />
      </Paper>
      {!data.completed === true && (
        <>
          <Box sx={{ mx: 2, textAlign: 'end' }}>
            <BaseButton color='secondary' onClick={handleOnClickEndGame}>
              ゲームを終了
            </BaseButton>
          </Box>
          <RecordCreateFormDrawer
            belongingPlayers={data.belongingPlayers}
            submitForm={submitForm}
            gameRule={data.rule}
          />
        </>
      )}
    </>
  )
}

export default Presenter
