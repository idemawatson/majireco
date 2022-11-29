import { RoundRecord as PrismaRoundRecord } from '@prisma/client'
import { RoundRecord, RoundRecordRankValue, RoundRecordScoreValue } from '../entity/RoundRecord'
import { DateValue, EntityId } from '../entity/valueObjects/CommonValueObjects'

export type RoundRecordRawProps = {
  id: string
  roundId: string
  createdAt: Date
  rank: number
  score: number
  playerOnGamePlayerId: string
  playerOnGameGameId: string
}

export default class RoundRecordMapper {
  static toDomain(values: PrismaRoundRecord) {
    const { id, roundId, createdAt, rank, score } = values
    return new RoundRecord({
      id: new EntityId(id),
      roundId: new EntityId(roundId),
      createdAt: new DateValue(createdAt, 'createdAt'),
      rank: new RoundRecordRankValue(rank),
      score: new RoundRecordScoreValue(score),
    })
  }
}
