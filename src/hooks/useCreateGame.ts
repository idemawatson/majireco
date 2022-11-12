import { useRouter } from 'next/router'
import { useLoading } from '@/components/uiParts/TheLoading/hooks'
import restClient from '@/libs/restClient'
import { ICreateGameForm } from '@/types/forms/CreateGameForm'
import { CreateGameResponseDTO } from '@/usecases/CreateGame/CreateGameDto'

export const useCreateGame = () => {
  const { showLoading, hideLoading } = useLoading()
  const router = useRouter()

  const handleCreateGame = async (data: ICreateGameForm) => {
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

  return { handleCreateGame }
}
