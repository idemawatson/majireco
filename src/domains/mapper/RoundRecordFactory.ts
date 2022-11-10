import { RoundRecord as PrismaRoundRecord } from '@prisma/client'
import { RoundRecord, RoundRecordRankValue, RoundRecordScoreValue } from '../entity/RoundRecord'
import { DateValue, EntityId } from '../entity/valueObjects/CommonValueObjects'

export type RoundRecordRawProps = {
  id: string
  createdAt: Date
  rank: number
  score: number
  playerOnGamePlayerId: string
  playerOnGameGameId: string
}

export default class RoundRecordFactory {
  static toDomain(values: PrismaRoundRecord) {
    const { id, createdAt, rank, score } = values
    return new RoundRecord({
      id: new EntityId(id),
      createdAt: new DateValue(createdAt, 'createdAt'),
      rank: new RoundRecordRankValue(rank),
      score: new RoundRecordScoreValue(score),
    })
  }
}
