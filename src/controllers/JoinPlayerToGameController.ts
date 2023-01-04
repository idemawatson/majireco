import { GameInvalidOperationError, GameValidationError, ValidationError } from '@/errors/error'
import JoinPlayerToGameUseCase from '@/usecases/JoinPlayerToGame/JoinPlayerToGameUseCase'
import {
  JoinPlayerToGameRequestDto,
  JoinPlayerToGameResponseDto,
} from '@/usecases/JoinPlayerToGame/JoinPlayerToGameDto'
import { Prisma } from '@prisma/client'
import errorCodes from '@/errors/errorCodes'

export class JoinPlayerToGameController {
  private joinPlayerToGameUseCase
  constructor() {
    this.joinPlayerToGameUseCase = new JoinPlayerToGameUseCase()
  }

  async joinPlayerToGame(body: any): Promise<JoinPlayerToGameResponseDto | void> {
    const { gameId, playerId } = body
    if (!gameId || !playerId) {
      throw new ValidationError()
    }
    const reqDTO = { gameId, playerId } as JoinPlayerToGameRequestDto
    try {
      return await this.joinPlayerToGameUseCase.execute(reqDTO)
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          throw new GameInvalidOperationError(
            'This player has already joined.',
            errorCodes.JOIN_GAME_DUPLICATION,
          )
        } else throw err
      }
    }
  }
}
