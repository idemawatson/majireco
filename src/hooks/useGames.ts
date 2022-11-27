import useSWR from 'swr'
import restClient from '@/libs/restClient'
import { ListGamesResponseDTO } from '@/usecases/ListGames/ListGamesDto'

export const useGames = () => {
  const fetcher = async (url: string): Promise<ListGamesResponseDTO> => {
    const response = await restClient.get(url)
    return response.data as ListGamesResponseDTO
  }
  const { data, mutate } = useSWR(`games`, fetcher, {
    suspense: true,
    revalidateOnFocus: false,
    revalidateIfStale: false,
  })

  return {
    data,
    mutate,
  }
}
