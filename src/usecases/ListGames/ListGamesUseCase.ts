import { ListGamesResponseDTO } from './ListGamesDto'
import { GameRepo } from '@/repositories/gameRepo'

export default class ListGamesUseCase {
  async execute({ playerId }: { playerId: string }): Promise<ListGamesResponseDTO> {
    const games = await GameRepo.listGame(playerId)
    return {
      games: games.map((game) => ({
        gameId: game.id,
        playedAt: game.playedAt.toISOString(),
        rule: game.rule,
        rate: game.rate,
        players: game.belongingPlayers?.map((bp) => bp.player?.name || '') || [],
        started: game.started,
      })),
    }
  }
}
