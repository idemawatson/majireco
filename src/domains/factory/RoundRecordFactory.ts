import { RoundRecord as PrismaRoundRecord } from '@prisma/client'
import { RoundRecord, RoundRecordRankValue, RoundRecordScoreValue } from '../entity/RoundRecord'
import { DateValue, EntityId } from '../entity/valueObjects/CommonValueObjects'

export default class RoundRecordFactory {
  static fromRaw(values: PrismaRoundRecord) {
    const { id, createdAt, rank, score } = values
    return new RoundRecord({
      id: new EntityId(id),
      createdAt: new DateValue(createdAt.toISOString(), 'createdAt'),
      rank: new RoundRecordRankValue(rank),
      score: new RoundRecordScoreValue(score),
    })
  }
}
