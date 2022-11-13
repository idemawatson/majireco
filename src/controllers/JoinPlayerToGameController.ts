import { ValidationError } from '@/errors/error'
import JoinPlayerToGameUseCase from '@/usecases/JoinPlayerToGame/JoinPlayerToGameUseCase'
import {
  JoinPlayerToGameRequestDto,
  JoinPlayerToGameResponseDto,
} from '@/usecases/JoinPlayerToGame/JoinPlayerToGameDto'

export class JoinPlayerToGameController {
  private joinPlayerToGameUseCase
  constructor() {
    this.joinPlayerToGameUseCase = new JoinPlayerToGameUseCase()
  }

  async joinPlayerToGame(body: any): Promise<JoinPlayerToGameResponseDto> {
    const { gameId, playerId } = body
    if (!gameId || !playerId) {
      throw new ValidationError()
    }
    const reqDTO = { gameId, playerId } as JoinPlayerToGameRequestDto
    return await this.joinPlayerToGameUseCase.execute(reqDTO)
  }
}
