import { GetGameRequestDTO, GetGameResponseDTO } from './GetGameDto'
import { GameInvalidDataError, GameNotFoundError } from '@/errors/error'
import { GameRepo } from '@/repositories/gameRepo'
import { Game } from '@/domains/entity/Game'

export default class GetGameUseCase {
  async execute(input: GetGameRequestDTO): Promise<Game> {
    const game = await GameRepo.getGame(input.id)
    if (game == null) {
      throw new GameNotFoundError('game is not found.')
    }
    return game
  }
}
