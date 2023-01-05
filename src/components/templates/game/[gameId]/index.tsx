import { useRouter } from 'next/router'
import { FC, Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Loading } from './loading'
import Presenter from './presenter'
import { ErrorFallback } from '@/components/templates/game/[gameId]/errorBoundary'
import { useLoading } from '@/components/uiParts/TheLoading/hooks'
import { useNotification } from '@/components/uiParts/TheNotificationToast/hooks'
import { useGame } from '@/hooks/useGame'
import restClient from '@/libs/restClient'
import { IUpdateGameForm } from '@/types/forms/GameUpdateForm'
import { UpdateGameResponseDto } from '@/usecases/UpdateGame/UpdateGameDto'

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
