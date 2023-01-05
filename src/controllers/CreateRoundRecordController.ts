import { ValidationError } from '@/errors/error'
import { CreateRoundRecordResponseDTO } from '@/usecases/CreateRoundRecord/CreateRoundRecordDto'
import CreateRoundRecordUseCase from '@/usecases/CreateRoundRecord/CreateRoundRecordUseCase'

export class CreateRoundRecordController {
  private createRoundRecordUseCase
  constructor() {
    this.createRoundRecordUseCase = new CreateRoundRecordUseCase()
  }

  async createGame(body: any, owner: string): Promise<CreateRoundRecordResponseDTO> {
    const { gameId, scores } = body
    if (!gameId) throw new ValidationError('gameId is required.')
    if (scores?.length < 4) throw new ValidationError('scores should have 4 items.')
    return await this.createRoundRecordUseCase.execute({ gameId, scores, owner })
  }
}
