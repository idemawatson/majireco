import { GameValidationError } from '@/errors/error'
import { ListGamesResponseDTO } from '@/usecases/ListGames/ListGamesDto'
import ListGamesUseCase from '@/usecases/ListGames/ListGamesUseCase'

export class ListGamesController {
  private listGameUseCase
  constructor() {
    this.listGameUseCase = new ListGamesUseCase()
  }

  async listGames(playerId: string): Promise<ListGamesResponseDTO> {
    if (!playerId) {
      throw new GameValidationError()
    }
    const reqDto = { playerId }
    return await this.listGameUseCase.execute(reqDto)
  }
}
