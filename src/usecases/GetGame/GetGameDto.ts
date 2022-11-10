import { GameRate, GameRule, PlayerOnGame } from '@prisma/client'

export type GetGameRequestDTO = {
  id: string
}

export interface GetGameResponseDTO {
  id: string
  rule: GameRule
  rate: GameRate
  started: boolean
  belongingPlayers?: PlayerOnGame[]
}
