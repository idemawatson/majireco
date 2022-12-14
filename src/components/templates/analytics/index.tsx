import { FC, Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from '@/components/templates/game/[gameId]/errorBoundary'
import Presenter from './presenter'

const Page: FC = () => {
  return (
    <>
      <Presenter />
    </>
  )
}

export default Page
