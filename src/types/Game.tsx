import { Game, GamesOnPlayers } from '@prisma/client'

type GameType = Game & {
  GamesOnPlayers: GamesOnPlayers[]
}

export default GameType
