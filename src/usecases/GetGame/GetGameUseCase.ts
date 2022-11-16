import { GetGameRequestDTO, GetGameResponseDTO } from './GetGameDto'
import { GameInvalidDataError, GameNotFoundError } from '@/errors/error'
import { GameRepo } from '@/repositories/gameRepo'

export default class GetGameUseCase {
  async execute(input: GetGameRequestDTO): Promise<GetGameResponseDTO> {
    const game = await GameRepo.getGame(input.id)
    if (game == null) {
      throw new GameNotFoundError('game is not found.')
    }
    if (!game.owner) {
      throw new GameInvalidDataError('game data is invalid.')
    }
    return {
      id: game.id,
      rate: game.rate,
      rule: game.rule,
      started: game.started,
      playedAt: game.playedAt.toISOString(),
      owner: {
        id: game.owner.id,
        name: game.owner.name,
      },
      belongingPlayers: game.belongingPlayers?.map((bg) => {
        return { playerId: bg.playerId, playerName: bg.player?.name || '', gameId: bg.gameId }
      }),
    }
  }
}
