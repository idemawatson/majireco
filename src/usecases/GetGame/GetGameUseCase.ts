import { NotFoundError } from '@/errors/error'
import { GameRepo } from '@/repositories/gameRepo'
import { GetGameRequestDTO, GetGameResponseDTO } from './GetGameDto'

export default class GetGameUseCase {
  async execute(input: GetGameRequestDTO): Promise<GetGameResponseDTO> {
    const game = await GameRepo.getGame(input.id)
    if (game == null) {
      throw new NotFoundError('game is not found.')
    }
    return {
      id: game.id,
      rate: game.rate,
      rule: game.rule,
      started: game.started,
      belongingPlayers: game.belongingPlayers?.map((player) => {
        return { playerId: player.playerId, gameId: player.gameId }
      }),
    }
  }
}
