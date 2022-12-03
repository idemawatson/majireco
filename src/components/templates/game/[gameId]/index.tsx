import { FC, Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from '@/components/templates/game/[gameId]/errorBoundary'
import { IUpdateGameForm } from '@/types/forms/GameUpdateForm'
import { Loading } from './loading'
import Presenter from './presenter'
import restClient from '@/libs/restClient'
import { UpdateGameResponseDto } from '@/usecases/UpdateGame/UpdateGameDto'
import { useLoading } from '@/components/uiParts/TheLoading/hooks'
import { useNotification } from '@/components/uiParts/TheNotificationToast/hooks'
import { useGetGame } from '@/hooks/useGetGame'
import { useRouter } from 'next/router'

const Page: FC = () => {
  const router = useRouter()
  const { showLoading, hideLoading } = useLoading()
  const { showError } = useNotification()

  const submitForm = async (form: IUpdateGameForm) => {
    const { data, mutate } = useGetGame(router.query.gameId as string)
    if (!data) return
    try {
      showLoading()
      await restClient.post<IUpdateGameForm & { gameId: string }, UpdateGameResponseDto>('/game', {
        ...form,
        gameId: router.query.gameId as string,
      })
      mutate({ ...data, started: true }, false)
    } catch (e) {
      showError('ゲームを開始できませんでした')
    } finally {
      hideLoading()
    }
  }
  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<Loading />}>
          <Presenter submitForm={submitForm}></Presenter>
        </Suspense>
      </ErrorBoundary>
    </>
  )
}

export default Page
