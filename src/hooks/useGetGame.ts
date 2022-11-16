import useSWR from 'swr'
import restClient from '@/libs/restClient'
import { GetGameResponseDTO } from '@/usecases/GetGame/GetGameDto'

export const useGetGame = (gameId: string) => {
  const fetcher = async (url: string): Promise<GetGameResponseDTO> => {
    const response = await restClient.get(url)
    return response.data as GetGameResponseDTO
  }
  const { data, mutate } = useSWR(`game?game_id=${gameId}`, fetcher, {
    suspense: true,
    revalidateOnFocus: false,
    revalidateIfStale: false,
  })

  return {
    data,
    mutate,
  }
}
