import BaseSpeedDial from '@/components/uiParts/BaseSpeedDial'
import { useGame } from '@/hooks/useGame'
import { IGameMemoForm } from '@/types/forms/GameMemoForm'
import { IRecordCreateForm } from '@/types/forms/RecordCreateForm'
import { useUser } from '@auth0/nextjs-auth0'
import { Add, CheckCircle, SpeakerNotes } from '@mui/icons-material'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import GameEndConfirmationDialog from './GameEndConfirmationDialog'
import RecordCreateFormDrawer from './RecordCreateFormDrawer'
import RecordMemoFormDrawer from './RecordMemoFormDrawer'

type Props = {
  createRecord: (data: IRecordCreateForm) => void
  updateMemo: (data: IGameMemoForm) => void
  endGame: () => void
}
const RecordMenuSpeedDial: FC<Props> = ({ createRecord, updateMemo, endGame }) => {
  const [open, setOpen] = useState(false)
  const [createRecordDrawer, setCreateRecordDrawer] = useState(false)
  const [memoDrawer, setMemoDrawer] = useState(false)
  const [endGameDialog, setEndGameDialog] = useState(false)

  const router = useRouter()
  const { data } = useGame(router.query.gameId as string)
  const { user } = useUser()

  const actions = () => {
    const actions = [
      {
        icon: <SpeakerNotes />,
        name: 'メモ',
        onClick: () => {
          setOpen(false)
          setMemoDrawer(true)
        },
      },
    ]
    if (!data?.completed) {
      actions.push({
        icon: <Add />,
        name: 'データ追加',
        onClick: () => {
          setOpen(false)
          setCreateRecordDrawer(true)
        },
      })
      if (data?.owner.id === user?.sub) {
        actions.push({
          icon: <CheckCircle />,
          name: '対局終了',
          onClick: () => {
            setOpen(false)
            setEndGameDialog(true)
          },
        })
      }
    }
    return actions
  }
  return (
    <>
      <BaseSpeedDial actions={actions()} open={open} setOpen={setOpen}></BaseSpeedDial>
      <RecordCreateFormDrawer
        drawer={createRecordDrawer}
        setDrawer={setCreateRecordDrawer}
        submitForm={createRecord}
      />
      <RecordMemoFormDrawer drawer={memoDrawer} setDrawer={setMemoDrawer} submitForm={updateMemo} />
      <GameEndConfirmationDialog
        open={endGameDialog}
        setOpen={setEndGameDialog}
        endGame={endGame}
      />
    </>
  )
}

export default RecordMenuSpeedDial
