import { ValidationError } from '@/errors/error'
import GetGamePresenter from '@/presenters/GetGamePresenter'
import { GetGameRequestDTO, GetGameResponseDTO } from '@/usecases/GetGame/GetGameDto'
import GetGameUseCase from '@/usecases/GetGame/GetGameUseCase'

export class GetGameController {
  private getGameUseCase
  private getGamePresenter
  constructor() {
    this.getGameUseCase = new GetGameUseCase()
    this.getGamePresenter = new GetGamePresenter()
  }

  async getGame(id: string): Promise<GetGameResponseDTO> {
    if (!id) {
      throw new ValidationError()
    }
    const reqDto = { id } as GetGameRequestDTO
    return this.getGamePresenter.toViewModel(await this.getGameUseCase.execute(reqDto))
  }
}
