import useSWR from 'swr'
import restClient from '@/libs/restClient'
import { GetGameResponseDTO } from '@/usecases/GetGame/GetGameDto'

export const useGame = (gameId: string) => {
  const fetcher = async (url: string): Promise<GetGameResponseDTO> => {
    const response = await restClient.get(url)
    return response.data as GetGameResponseDTO
  }
  const { data, mutate } = useSWR(gameId ? `game?game_id=${gameId}` : null, fetcher, {
    suspense: true,
    revalidateOnFocus: false,
    revalidateIfStale: false,
  })

  return {
    data,
    mutate,
  }
}
