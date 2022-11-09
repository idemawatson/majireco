import { useLoading } from '@/components/uiParts/TheLoading/hooks'
import { Game } from '@/domains/entity/Game'
import restClient from '@/libs/restClient'
import { IUpdateGameForm } from '@/types/forms/UpdateGameForm'

export const updateGame = () => {
  const { showLoading, hideLoading } = useLoading()

  const handleStartGame = async (data: IUpdateGameForm) => {
    showLoading()
    await restClient.patch<IUpdateGameForm, Game>('/game', {
      ...data,
      started: true,
    })
    hideLoading()
  }

  return { handleStartGame }
}
