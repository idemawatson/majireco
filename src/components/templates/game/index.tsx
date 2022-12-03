import { FC } from 'react'
import { useCreateGame } from '@/hooks/useCreateGame'
import { ICreateGameForm } from '@/types/forms/GameCreateForm'
import Presenter from './presenter'

const Page: FC = () => {
  const { handleCreateGame } = useCreateGame()
  const submitForm = async (data: ICreateGameForm) => {
    await handleCreateGame(data)
  }
  return (
    <>
      <Presenter submitForm={submitForm}></Presenter>
    </>
  )
}

export default Page
