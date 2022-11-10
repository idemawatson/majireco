import { GetGameRequestDTO, GetGameResponseDTO } from '@/usecases/GetGame/GetGameDto'
import GetGameUseCase from '@/usecases/GetGame/GetGameUseCase'

export class GetGameController {
  private getGameUseCase
  constructor() {
    this.getGameUseCase = new GetGameUseCase()
  }

  async getGame(req: GetGameRequestDTO): Promise<GetGameResponseDTO> {
    return await this.getGameUseCase.execute(req)
  }
}
