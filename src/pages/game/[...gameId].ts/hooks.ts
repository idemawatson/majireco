import restClient from '@/libs/restClient'
import GameType from '@/types/game'
import useSWR from 'swr'

export const useGame = () => {
  const fetcher = async (url: string): Promise<GameType> => {
    const response = await restClient.get(url)
    return response.data as GameType
  }
  const { data, error } = useSWR(
    `/api/game?game_id=29bc54d7-f92c-4352-910b-193b77070fc6`,
    fetcher,
    { suspense: true },
  )

  return {
    data,
    error,
  }
}
