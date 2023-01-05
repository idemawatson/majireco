import { useRouter } from 'next/router'
import { FC, Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Loading } from './loading'
import { ErrorFallback } from '@/components/templates/game/join/[gameId]/errorBoundary'
import Presenter from '@/components/templates/game/join/[gameId]/presenter'
import { useLoading } from '@/components/uiParts/TheLoading/hooks'
import { useNotification } from '@/components/uiParts/TheNotificationToast/hooks'
import errorCodes from '@/errors/errorCodes'
import restClient from '@/libs/restClient'
import { JoinPlayerToGameResponseDto } from '@/usecases/JoinPlayerToGame/JoinPlayerToGameDto'

type IJoinGameForm = {
  gameId: string
}

const Page: FC = () => {
  const { showLoading, hideLoading } = useLoading()
  const { showError, showSuccess } = useNotification()
  const router = useRouter()
  const joinGame = async () => {
    try {
      showLoading()
      await restClient.patch<IJoinGameForm, JoinPlayerToGameResponseDto>('/game', {
        gameId: router.query.gameId as string,
      })
      showSuccess('対局に参加しました！')
      router.push('/games')
    } catch (err: any) {
      console.error(err)
      if (err.response?.data?.code === errorCodes.JOIN_GAME_DUPLICATION)
        showError('エラー: 既に参加済みです')
      else showError('エラー: 対局参加に失敗しました')
    } finally {
      hideLoading()
    }
  }
  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<Loading />}>
          <Presenter joinGame={joinGame} />
        </Suspense>
      </ErrorBoundary>
    </>
  )
}
export default Page
