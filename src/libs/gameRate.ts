import { GameRate } from '@prisma/client'
import { GAME_RATE_SELECTIONS } from './const'

export const getRateText = (value: string) =>
  GAME_RATE_SELECTIONS.find((rate) => rate.value === value)?.text

export const calcRate = (score: number, rate: GameRate) => {
  if (rate === 'PER_10') return score * 10
  else if (rate === 'PER_30') return score * 30
  else if (rate === 'PER_50') return score * 50
  else return 0
}
