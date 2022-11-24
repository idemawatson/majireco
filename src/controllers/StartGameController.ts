import { GameValidationError, ValidationError } from '@/errors/error'
import UpdateGameUseCase from '@/usecases/UpdateGame/UpdateGameUseCase'
import { UpdateGameRequestDto, UpdateGameResponseDto } from '@/usecases/UpdateGame/UpdateGameDto'
import GetGameUseCase from '@/usecases/GetGame/GetGameUseCase'

export class StartGameController {
  private updateGameUseCase
  private getGameUseCase
  constructor() {
    this.updateGameUseCase = new UpdateGameUseCase()
    this.getGameUseCase = new GetGameUseCase()
  }

  async startGame(body: any): Promise<UpdateGameResponseDto> {
    const { gameId, playerId, rule, rate } = body
    if (!gameId || !playerId || !rule || !rate) {
      throw new ValidationError()
    }
    const game = await this.getGameUseCase.execute({ id: gameId })
    if (!game.belongingPlayers || game.belongingPlayers.length != 4) {
      throw new GameValidationError()
    }
    const reqDTO = { gameId, playerId, rate, rule, started: true } as UpdateGameRequestDto
    return await this.updateGameUseCase.execute(reqDTO)
  }
}
