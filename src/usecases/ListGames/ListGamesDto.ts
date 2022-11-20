import { GameRate, GameRule } from '@prisma/client'

export interface ListGamesResponseDTO {
  games: { gameId: string; playedAt: string; players: string[]; rate: GameRate; rule: GameRule }[]
}
