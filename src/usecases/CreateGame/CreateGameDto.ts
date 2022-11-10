import { GameRate, GameRule } from '@prisma/client'

export type CreateGameRequestDTO = {
  rule: GameRule
  rate: GameRate
  owner: string
}

export interface CreateGameResponseDTO {
  id: string
}
