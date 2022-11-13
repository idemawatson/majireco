import { GameRate as PrismaGameRate, GameRule as PrismaGameRule } from '@prisma/client'
import dayjs from 'dayjs'
import { Game, GameRate, GameRule } from '../entity/Game'
import {
  BoolValue,
  DateValue,
  EmailValue,
  EntityId,
} from '../entity/valueObjects/CommonValueObjects'
import PlayerMapper, { PlayerRawProps } from './PlayerMapper'
import PlayerOnGameMapper, { PlayerOnGameRawProps } from './PlayerOnGameMapper'

type GameRawProps = {
  id: string
  playedAt: Date
  rate: PrismaGameRate
  rule: PrismaGameRule
  started: boolean
  ownerId: string
  owner?: PlayerRawProps
  belongingPlayers?: PlayerOnGameRawProps[]
}

export default class GameMapper {
  static toDomain(values: GameRawProps): Game {
    const { id, playedAt, rate, rule, started, ownerId, owner, belongingPlayers } = values
    return new Game({
      id: new EntityId(id),
      rule: new GameRule(rule),
      rate: new GameRate(rate),
      playedAt: new DateValue(dayjs(playedAt).toDate(), 'playedAt'),
      started: new BoolValue(started),
      ownerId: new EmailValue(ownerId),
      owner: owner ? PlayerMapper.toDomain(owner) : undefined,
      belongingPlayers: belongingPlayers?.map(PlayerOnGameMapper.toDomain),
    })
  }

  static toPersistent(game: Game) {
    return {
      id: game.id,
      playedAt: game.playedAt,
      rate: game.rate,
      rule: game.rule,
      ownerId: game.ownerId,
      started: game.started,
    }
  }
}
