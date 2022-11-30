import { GameRate, GameRule } from '@prisma/client'

export type GetGameRequestDTO = {
  id: string
}

export interface GetGameResponseDTO {
  id: string
  rule: GameRule
  rate: GameRate
  started: boolean
  playedAt: string
  owner: {
    id: string
    name: string
  }
  belongingPlayers: {
    playerId: string
    playerName: string
  }[]
  roundRecords: {
    [gameId: string]: {
      playerId: string
      rank: Number
      score: Number
    }[]
  }
}
