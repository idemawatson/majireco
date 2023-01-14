import { RoundRecordRepo } from '@/repositories/roundRecordRepo'

type reqProps = {
  roundId: string
  operatorId: string
}

export default class DeleteRoundRecordUseCase {
  async execute(req: reqProps): Promise<void> {
    await RoundRecordRepo.deleteRoundRecord(req.roundId, req.operatorId)
  }
}
