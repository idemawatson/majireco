import { GameValidationError } from '@/errors/error'
import GetGameUseCase from '@/usecases/GetGame/GetGameUseCase'
import { UpdateGameRequestDto, UpdateGameResponseDto } from '@/usecases/UpdateGame/UpdateGameDto'
import UpdateGameUseCase from '@/usecases/UpdateGame/UpdateGameUseCase'

export class UpdateGameController {
  private updateGameUseCase
  private getGameUseCase
  constructor() {
    this.updateGameUseCase = new UpdateGameUseCase()
    this.getGameUseCase = new GetGameUseCase()
  }

  async updateGame(body: any): Promise<UpdateGameResponseDto> {
    const { gameId, playerId, rule, rate, memo, started, completed } = body
    if (gameId == null || playerId == null) {
      throw new GameValidationError('parameter not found.')
    }
    const game = await this.getGameUseCase.execute({ id: gameId })
    if (started === true && game.belongingPlayers?.length != 4) {
      throw new GameValidationError('belongingPlayers is less than 4.')
    }
    const reqDTO = {
      gameId,
      playerId,
      rule,
      rate,
      memo,
      started,
      completed,
    } as UpdateGameRequestDto
    return await this.updateGameUseCase.execute(reqDTO)
  }
}
