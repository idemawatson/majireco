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
    const { id, roundId, playerOnGameGameId, playerOnGamePlayerId, createdAt, rank, score } = values
    return new RoundRecord({
      id: new EntityId(id),
      roundId: new EntityId(roundId),
      playerOnGameGameId: new EntityId(playerOnGameGameId),
      playerOnGamePlayerId: new EntityId(playerOnGamePlayerId),
      createdAt: new DateValue(createdAt, 'createdAt'),
      rank: new RoundRecordRankValue(rank),
      score: new RoundRecordScoreValue(score),
    })
  }
  static toPersistent(entity: RoundRecord) {
    return {
      id: entity.id,
      roundId: entity.roundId,
      rank: entity.rank,
      score: entity.score,
      createdAt: entity.createdAt,
      playerOnGameGameId: entity.playerOnGameGameId,
      playerOnGamePlayerId: entity.playerOnGamePlayerId,
    }
  }
}
