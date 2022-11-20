import useSWR from 'swr'
import restClient from '@/libs/restClient'
import { ListGamesResponseDTO } from '@/usecases/ListGames/ListGamesDto'
import { GameRate, GameRule } from '@prisma/client'

export const useGames = () => {
  const fetcher = async (url: string): Promise<ListGamesResponseDTO> => {
    await new Promise((resolve) => setTimeout(resolve, 3000))
    return {
      games: [
        {
          gameId: '1',
          playedAt: '2022-01-01',
          players: ['井手拓海', '井手拓海', '井手拓海', '井手拓海'],
          rate: GameRate.NO_RATE,
          rule: GameRule.RULE_1020,
        },
        {
          gameId: '2',
          playedAt: '2022-02-01',
          players: ['井手拓海', '井手拓海', '井手拓海', '井手拓海'],
          rate: GameRate.NO_RATE,
          rule: GameRule.RULE_1020,
        },
        {
          gameId: '3',
          playedAt: '2022-03-01',
          players: ['井手拓海', '井手拓海', '井手拓海', '井手拓海'],
          rate: GameRate.NO_RATE,
          rule: GameRule.RULE_1020,
        },
      ],
    }
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
