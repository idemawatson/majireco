import { ValidationError } from '@/errors/error'
import DeleteRoundRecordUseCase from '@/usecases/DeleteRoundRecord/DeleteRoundRecordUseCase'

export class DeleteRoundRecordController {
  private deleteRoundRecordUseCase
  constructor() {
    this.deleteRoundRecordUseCase = new DeleteRoundRecordUseCase()
  }

  async execute(roundId: string, operatorId: string): Promise<void> {
    if (!roundId) {
      throw new ValidationError('roundId is required.')
    }
    await this.deleteRoundRecordUseCase.execute({ roundId, operatorId })
  }
}
