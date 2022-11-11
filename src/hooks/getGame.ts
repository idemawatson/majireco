import restClient from '@/libs/restClient'
import { GetGameResponseDTO } from '@/usecases/GetGame/GetGameDto'
import useSWR from 'swr'

export const getGame = (gameId: string) => {
  const fetcher = async (url: string): Promise<GetGameResponseDTO> => {
    const response = await restClient.get(url)
    return response.data as GetGameResponseDTO
  }
  const { data } = useSWR(`game?game_id=${gameId}`, fetcher, {
    suspense: true,
    revalidateOnFocus: false,
    revalidateIfStale: false,
  })

  return {
    data,
  }
}
