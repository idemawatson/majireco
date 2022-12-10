import { FC, Suspense } from 'react'
import Loading from './loading'
import Presenter from './presenter'

const Page: FC = () => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Presenter />
      </Suspense>
    </>
  )
}

export default Page
