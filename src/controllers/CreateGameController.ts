import { CreateGameRequestDTO, CreateGameResponseDTO } from '@/usecases/CreateGame/CreateGameDto'
import CreateGameUseCase from '@/usecases/CreateGame/CreateGameUseCase'
import { Session } from '@auth0/nextjs-auth0'
import { NextApiRequest } from 'next'

export class CreateGameController {
  private createGameUseCase
  constructor() {
    this.createGameUseCase = new CreateGameUseCase()
  }

  async createGame(req: NextApiRequest, session: Session): Promise<CreateGameResponseDTO> {
    const reqDTO = { ...req.body, owner: session.user.email } as CreateGameRequestDTO
    return await this.createGameUseCase.execute(reqDTO)
  }
}
