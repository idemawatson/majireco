import { FC } from 'react'
import { ICreateGameForm } from '@/types/forms/GameCreateForm'
import Presenter from './presenter'
import { useLoading } from '@/components/uiParts/TheLoading/hooks'
import { useRouter } from 'next/router'
import restClient from '@/libs/restClient'
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
