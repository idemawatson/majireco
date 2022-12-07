import { Box, Paper } from '@mui/material'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { useGame } from '@/hooks/useGame'
import RoundRecordBoard from '@/components/organisms/record/RoundRecordBoard'
import { IRecordCreateForm } from '@/types/forms/RecordCreateForm'
import { BaseButton } from '@/components/uiParts/BaseButton'
import RecordCreateFormDrawer from '@/components/organisms/record/RecordCreateFormDrawer'

type Props = {
  submitForm: (form: IRecordCreateForm) => void
  handleOnClickEndGame: () => void
}

const Presenter: FC<Props> = ({ submitForm, handleOnClickEndGame }) => {
  const router = useRouter()
  const { data } = useGame(router.query.gameId as string)

  return (
    <>
      <Paper
        sx={{
          my: 2,
          mx: 2,
        }}
        elevation={0}
      >
        {data && (
          <RoundRecordBoard
            belongingPlayers={data.belongingPlayers}
            roundRecords={data.roundRecords}
          />
        )}
      </Paper>
      {data && !data.completed === true && (
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
