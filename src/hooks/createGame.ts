import { useLoading } from '@/components/uiParts/TheLoading/hooks'
import { Game } from '@/domains/entity/Game'
import restClient from '@/libs/restClient'
import { ICreateGameForm } from '@/types/forms/CreateGameForm'
import { useRouter } from 'next/router'

export const createGame = () => {
  const { showLoading, hideLoading } = useLoading()
  const router = useRouter()

  const handleCreateGame = async (data: ICreateGameForm) => {
    showLoading()
    const response = await restClient.put<ICreateGameForm, Game>('/game', data)
    hideLoading()
    router.push(`game/${response.data.id}`)
  }

  return { handleCreateGame }
}
