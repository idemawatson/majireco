import { RoundRecord as PrismaRoundRecord } from '@prisma/client'
import { PlayerOnGame } from '../entity/PlayerOnGame'
import { EntityId } from '../entity/valueObjects/CommonValueObjects'
import RoundRecordFactory from './RoundRecordFactory'

export type PlayerOnGameRawProps = {
  playerId: string
  gameId: string
  roundRecords: PrismaRoundRecord[]
}

export default class PlayerOnGameMapper {
  static toDomain(values: PlayerOnGameRawProps) {
    const { playerId, gameId, roundRecords } = values
    return new PlayerOnGame({
      playerId: new EntityId(playerId),
      gameId: new EntityId(gameId),
      roundRecords: roundRecords.map((rr) => RoundRecordFactory.toDomain(rr)),
    })
  }
  static toPersistent(entity: PlayerOnGame) {
    return {
      playerId: entity.playerId,
      gameId: entity.gameId,
      roundRecords: entity.roundRecords.length ? entity.roundRecords : undefined,
    }
  }
}
