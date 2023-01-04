import { ValidationError } from '@/errors/error'
import { GetPlayerRequestDTO, GetPlayerResponseDTO } from '@/usecases/GetPlayer/GetPlayerDto'
import GetPlayerUseCase from '@/usecases/GetPlayer/GetPlayerUseCase'

export class GetPlayerController {
  private getPlayerUseCase
  constructor() {
    this.getPlayerUseCase = new GetPlayerUseCase()
  }

  async getPlayer(id: string): Promise<GetPlayerResponseDTO> {
    if (!id) {
      throw new ValidationError()
    }
    const reqDto = { id } as GetPlayerRequestDTO
    const player = await this.getPlayerUseCase.execute(reqDto)
    return {
      id: player.id,
      name: player.name,
    }
  }
}
