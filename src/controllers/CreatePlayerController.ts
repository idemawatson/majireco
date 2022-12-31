import { ValidationError } from '@/errors/error'
import {
  CreatePlayerRequestDTO,
  CreatePlayerResponseDTO,
} from '@/usecases/CreatePlayer/CreatePlayerDto'
import CreatePlayerUseCase from '@/usecases/CreatePlayer/CreatePlayerUseCase'

export class CreatePlayerController {
  private createPlayerUseCase
  constructor() {
    this.createPlayerUseCase = new CreatePlayerUseCase()
  }

  async createPlayer({
    playerId,
    name,
  }: {
    playerId: string
    name: string
  }): Promise<CreatePlayerResponseDTO> {
    if (!playerId) {
      throw new ValidationError('playerId is required.')
    }
    if (!name) {
      throw new ValidationError('name is required.')
    }
    const reqDTO = { playerId, name } as CreatePlayerRequestDTO
    return await this.createPlayerUseCase.execute(reqDTO)
  }
}
