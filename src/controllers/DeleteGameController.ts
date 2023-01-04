import { ValidationError } from '@/errors/error'
import DeleteGameUseCase from '@/usecases/DeleteGame/DeleteGameUseCase'

export class DeleteGameController {
  private deleteGameUseCase
  constructor() {
    this.deleteGameUseCase = new DeleteGameUseCase()
  }

  async deleteGame(gameId: string, operatorId: string): Promise<void> {
    if (!gameId) {
      throw new ValidationError('gameId is required.')
    }
    await this.deleteGameUseCase.execute({ gameId, operatorId })
  }
}
