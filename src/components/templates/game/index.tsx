import { useRouter } from 'next/router'
import { FC } from 'react'
import Presenter from './presenter'
import { useLoading } from '@/components/uiParts/TheLoading/hooks'
import restClient from '@/libs/restClient'
import { ICreateGameForm } from '@/types/forms/GameCreateForm'
import { CreateGameResponseDTO } from '@/usecases/CreateGame/CreateGameDto'

const Page: FC = () => {
  const { showLoading, hideLoading } = useLoading()
  const router = useRouter()

  const submitForm = async (data: ICreateGameForm) => {
    try {
      showLoading()
      const response = await restClient.put<ICreateGameForm, CreateGameResponseDTO>('/game', data)
      router.push(`game/${response.data.id}`)
    } catch (err) {
      console.error(err)
    } finally {
      hideLoading()
    }
  }

  return (
    <>
      <Presenter submitForm={submitForm}></Presenter>
    </>
  )
}

export default Page
