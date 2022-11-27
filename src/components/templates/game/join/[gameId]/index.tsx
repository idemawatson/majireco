import { FC, Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import Presenter from '@/components/templates/game/join/[gameId]/presenter'
import { ErrorFallback } from '@/components/templates/game/join/[gameId]/errorBoundary'
import { Loading } from './loading'
import { useLoading } from '@/components/uiParts/TheLoading/hooks'
import restClient from '@/libs/restClient'
import { JoinPlayerToGameResponseDto } from '@/usecases/JoinPlayerToGame/JoinPlayerToGameDto'
import { useRouter } from 'next/router'
import { useNotification } from '@/components/uiParts/TheNotificationToast/hooks'

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
      showSuccess('ゲームに参加しました！')
      router.push('/games')
    } catch (err) {
      console.error(err)
      showError('エラー: ゲーム参加に失敗しました')
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
