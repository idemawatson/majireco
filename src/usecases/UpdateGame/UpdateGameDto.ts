import { GameRate, GameRule } from '@prisma/client'

export type UpdateGameRequestDto = {
  gameId: string
  playerId: string
  rate: GameRate
  rule: GameRule
  started: boolean
}

export interface UpdateGameResponseDto {
  gameId: string
}
