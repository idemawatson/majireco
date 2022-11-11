import { ValidationError } from '@/errors/error'
import { CreateGameRequestDTO, CreateGameResponseDTO } from '@/usecases/CreateGame/CreateGameDto'
import CreateGameUseCase from '@/usecases/CreateGame/CreateGameUseCase'
import { Session } from '@auth0/nextjs-auth0'
import { NextApiRequest } from 'next'

export class CreateGameController {
  private createGameUseCase
  constructor() {
    this.createGameUseCase = new CreateGameUseCase()
  }

  async createGame(body: any, owner: string): Promise<CreateGameResponseDTO> {
    const { rule, rate } = body
    if (!rule || !rate || !owner) {
      throw new ValidationError()
    }
    const reqDTO = { rule, rate, owner } as CreateGameRequestDTO
    return await this.createGameUseCase.execute(reqDTO)
  }
}
