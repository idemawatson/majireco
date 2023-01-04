import { GameInvalidOperationError, GameNotFoundError } from '@/errors/error'
import { GameRepo } from '@/repositories/gameRepo'

export default class DeleteGameUseCase {
  async execute(req: { gameId: string; operatorId: string }): Promise<void> {
    console.log(req)
    const game = await GameRepo.getGame(req.gameId)
    if (!game) throw new GameNotFoundError()
    if (game.ownerId !== req.operatorId) throw new GameInvalidOperationError()
    await GameRepo.deleteGame({ gameId: req.gameId })
  }
}
