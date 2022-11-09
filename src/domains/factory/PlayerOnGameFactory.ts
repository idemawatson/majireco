import {
  PlayerOnGame as PrismaPlayerOnGame,
  RoundRecord as PrismaRoundRecord,
} from '@prisma/client'
import { PlayerOnGame } from '../entity/PlayerOnGame'
import { EntityId } from '../entity/valueObjects/CommonValueObjects'
import RoundRecordFactory from './RoundRecordFactory'

export default class PlayerOnGameFactory {
  static fromRaw(values: PrismaPlayerOnGame & { roundRecords: PrismaRoundRecord[] }) {
    const { playerId, gameId, roundRecords } = values
    return new PlayerOnGame({
      playerId: new EntityId(playerId),
      gameId: new EntityId(gameId),
      roundRecords: roundRecords.map((rr) => RoundRecordFactory.fromRaw(rr)),
    })
  }
}
