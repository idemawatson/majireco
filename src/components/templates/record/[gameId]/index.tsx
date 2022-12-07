import { useLoading } from '@/components/uiParts/TheLoading/hooks'
import { useNotification } from '@/components/uiParts/TheNotificationToast/hooks'
import restClient from '@/libs/restClient'
import { IRecordCreateForm } from '@/types/forms/RecordCreateForm'
import {
  CreateRoundRecordRequestDTO,
  CreateRoundRecordResponseDTO,
} from '@/usecases/CreateRoundRecord/CreateRoundRecordDto'
import { UpdateGameResponseDto } from '@/usecases/UpdateGame/UpdateGameDto'
import { useRouter } from 'next/router'
import { FC, Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useSWRConfig } from 'swr'
import { ErrorFallback } from './errorBoundary'
import { Loading } from './loading'
import Presenter from './presenter'

const Page: FC = () => {
  const { showLoading, hideLoading } = useLoading()
  const { showError, showSuccess } = useNotification()
  const router = useRouter()
  const gameId = router.query.gameId as string
  const { mutate } = useSWRConfig()

  const submitForm = async (form: IRecordCreateForm) => {
    const scores = [
      { playerId: form.player1, score: form.p1Score },
      { playerId: form.player2, score: form.p2Score },
      { playerId: form.player3, score: form.p3Score },
      { playerId: form.player4, score: form.p4Score },
    ]
    try {
      showLoading()
      await restClient.put<CreateRoundRecordRequestDTO, CreateRoundRecordResponseDTO>('/record', {
        scores,
        gameId,
      })
      showSuccess('半荘データを作成しました')
      mutate(`game?game_id=${gameId}`)
    } catch (e) {
      showError('データ作成に失敗しました')
    } finally {
      hideLoading()
    }
  }

  const endGame = async () => {
    try {
      showLoading()
      await restClient.post<{ gameId: string; completed: boolean }, UpdateGameResponseDto>(
        '/game',
        {
          gameId,
          completed: true,
        },
      )
      mutate(`game?game_id=${gameId}`)
    } catch (e) {
      showError('ゲームの更新に失敗しました')
    } finally {
      hideLoading()
    }
  }
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<Loading />}>
        <Presenter submitForm={submitForm} handleOnClickEndGame={endGame}></Presenter>
      </Suspense>
    </ErrorBoundary>
  )
}

export default Page
