import { ValidationError } from '@/errors/error'
import GetAggregatedRecordsUseCase from '@/usecases/GetAggregatedRecords.ts/GetAggregatedRecordsUseCase'
import { GetAggregatedRecordsResponseDTO } from '@/usecases/GetAggregatedRecords.ts/GetAggregatedRecordsDto'
import { GameRate } from '@prisma/client'

export class GetAggregatedRecordsController {
  private getAggregatedRecordsUseCase
  constructor() {
    this.getAggregatedRecordsUseCase = new GetAggregatedRecordsUseCase()
  }

  async execute({
    playerId,
    rate,
    from,
    to,
    targetPlayerId,
  }: {
    playerId: string
    rate?: string
    from: string
    to: string
    targetPlayerId?: string
  }): Promise<GetAggregatedRecordsResponseDTO> {
    if (!playerId) throw new ValidationError('playerId is required.')
    if (playerId === targetPlayerId) throw new ValidationError('playerId is duplicated.')
    if (!from || !to) throw new ValidationError('from and to is required.')
    return await this.getAggregatedRecordsUseCase.execute({
      playerId,
      rate: rate as GameRate,
      from,
      to,
      targetPlayerId,
    })
  }
}
