import useSWR from 'swr'
import restClient from '@/libs/restClient'
import { GetPlayerResponseDTO } from '@/usecases/GetPlayer/GetPlayerDto'

export const usePlayer = () => {
  const fetcher = async (url: string): Promise<GetPlayerResponseDTO> => {
    const response = await restClient.get(url)
    return response.data as GetPlayerResponseDTO
  }
  const { data, mutate } = useSWR(`player`, fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
  })

  return {
    data,
    mutate,
  }
}
