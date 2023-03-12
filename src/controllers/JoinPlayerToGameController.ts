import { Prisma } from '@prisma/client'
import { GameInvalidOperationError, GameValidationError, ValidationError } from '@/errors/error'
import errorCodes from '@/errors/errorCodes'
import GetGameUseCase from '@/usecases/GetGame/GetGameUseCase'
import {
  JoinPlayerToGameRequestDto,
  JoinPlayerToGameResponseDto,
} from '@/usecases/JoinPlayerToGame/JoinPlayerToGameDto'
import JoinPlayerToGameUseCase from '@/usecases/JoinPlayerToGame/JoinPlayerToGameUseCase'

export class JoinPlayerToGameController {
  private joinPlayerToGameUseCase
  private getGameUseCase
  constructor() {
    this.joinPlayerToGameUseCase = new JoinPlayerToGameUseCase()
    this.getGameUseCase = new GetGameUseCase()
  }

  async joinPlayerToGame(body: any): Promise<JoinPlayerToGameResponseDto | void> {
    const { gameId, playerId } = body
    if (!gameId || !playerId) {
      throw new ValidationError()
    }
    const game = await this.getGameUseCase.execute({ id: gameId })
    if (game.started === true)
      throw new GameInvalidOperationError('game is already started.', errorCodes.JOIN_GAME_STARTED)
    if (game.belongingPlayers && game.belongingPlayers.length === 4)
      throw new GameInvalidOperationError('game is full.', errorCodes.JOIN_GAME_OVER_4)

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
