import { GameValidationError } from '@/errors/error'
import UpdateGameUseCase from '@/usecases/UpdateGame/UpdateGameUseCase'
import { UpdateGameRequestDto, UpdateGameResponseDto } from '@/usecases/UpdateGame/UpdateGameDto'
import GetGameUseCase from '@/usecases/GetGame/GetGameUseCase'

export class UpdateGameController {
  private updateGameUseCase
  private getGameUseCase
  constructor() {
    this.updateGameUseCase = new UpdateGameUseCase()
    this.getGameUseCase = new GetGameUseCase()
  }

  async updateGame(body: any): Promise<UpdateGameResponseDto> {
    const { gameId, playerId, rule, rate, started, completed } = body
    if (gameId == null || playerId == null) {
      throw new GameValidationError('parameter not found.')
    }
    const game = await this.getGameUseCase.execute({ id: gameId })
    if (started === true && game.belongingPlayers?.length != 4) {
      throw new GameValidationError('belongingPlayers is less than 4.')
    }
    const reqDTO = { gameId, playerId, rate, rule, started, completed } as UpdateGameRequestDto
    return await this.updateGameUseCase.execute(reqDTO)
  }
}
