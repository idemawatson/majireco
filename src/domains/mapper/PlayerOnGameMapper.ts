import { RoundRecord as PrismaRoundRecord } from '@prisma/client'
import { PlayerOnGame } from '../entity/PlayerOnGame'
import { EntityId } from '../entity/valueObjects/CommonValueObjects'
import PlayerMapper, { PlayerRawProps } from './PlayerMapper'
import RoundRecordMapper from './RoundRecordMapper'

export type PlayerOnGameRawProps = {
  playerId: string
  gameId: string
  player?: PlayerRawProps
  roundRecords?: PrismaRoundRecord[]
}

export default class PlayerOnGameMapper {
  static toDomain(values: PlayerOnGameRawProps) {
    const { playerId, gameId, player, roundRecords } = values
    return new PlayerOnGame({
      playerId: new EntityId(playerId),
      gameId: new EntityId(gameId),
      player: player ? PlayerMapper.toDomain(player) : undefined,
      roundRecords: roundRecords ? roundRecords.map((rr) => RoundRecordMapper.toDomain(rr)) : [],
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
