import { ValidationError } from '@/errors/error'
import { GetGameRequestDTO, GetGameResponseDTO } from '@/usecases/GetGame/GetGameDto'
import GetGameUseCase from '@/usecases/GetGame/GetGameUseCase'

export class GetGameController {
  private getGameUseCase
  constructor() {
    this.getGameUseCase = new GetGameUseCase()
  }

  async getGame(id: string): Promise<GetGameResponseDTO> {
    if (!id) {
      throw new ValidationError()
    }
    const reqDto = { id } as GetGameRequestDTO
    return await this.getGameUseCase.execute(reqDto)
  }
}
