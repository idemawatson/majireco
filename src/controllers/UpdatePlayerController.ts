import { ValidationError } from '@/errors/error'
import { UpdatePlayerResponseDTO } from '@/usecases/UpdatePlayer/UpdatePlayerDto'
import UpdatePlayerUseCase from '@/usecases/UpdatePlayer/UpdatePlayerUseCase'

export class UpdatePlayerController {
  private updatePlayerUseCase
  constructor() {
    this.updatePlayerUseCase = new UpdatePlayerUseCase()
  }

  async updatePlayer({
    playerId,
    name,
  }: {
    playerId: string
    name: string
  }): Promise<UpdatePlayerResponseDTO> {
    if (!playerId) {
      throw new ValidationError('playerId is required.')
    }
    if (!name) {
      throw new ValidationError('name is required.')
    }
    return await this.updatePlayerUseCase.execute({ playerId, name })
  }
}
