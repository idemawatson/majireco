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
import { useGame } from '@/hooks/useGame'
import { useRouter } from 'next/router'

const Page: FC = () => {
  const router = useRouter()
  const { showLoading, hideLoading } = useLoading()
  const { showError } = useNotification()

  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<Loading />}>
          <Presenter></Presenter>
        </Suspense>
      </ErrorBoundary>
    </>
  )
}

export default Page
