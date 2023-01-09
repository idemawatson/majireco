import { GameRate as PrismaGameRate, GameRule as PrismaGameRule } from '@prisma/client'
import dayjs from 'dayjs'
import { Game, GameMemo, GameRate, GameRule } from '../entity/Game'
import { BoolValue, DateValue, EntityId } from '../entity/valueObjects/CommonValueObjects'
import PlayerMapper, { PlayerRawProps } from './PlayerMapper'
import PlayerOnGameMapper, { PlayerOnGameRawProps } from './PlayerOnGameMapper'

type GameRawProps = {
  id: string
  playedAt: Date
  rate: PrismaGameRate
  rule: PrismaGameRule
  memo?: string | null
  started: boolean
  completed: boolean
  ownerId: string
  owner?: PlayerRawProps
  belongingPlayers?: PlayerOnGameRawProps[]
}

export default class GameMapper {
  static toDomain(values: GameRawProps): Game {
    const { id, playedAt, rate, rule, memo, started, completed, ownerId, owner, belongingPlayers } =
      values
    return new Game({
      id: new EntityId(id),
      playedAt: new DateValue(dayjs(playedAt).toDate(), 'playedAt'),
      rule: new GameRule(rule),
      rate: new GameRate(rate),
      memo: memo ? new GameMemo(memo) : undefined,
      started: new BoolValue(started),
      completed: new BoolValue(completed),
      ownerId: new EntityId(ownerId),
      owner: owner ? PlayerMapper.toDomain(owner) : undefined,
      belongingPlayers: belongingPlayers?.map(PlayerOnGameMapper.toDomain),
    })
  }

  static toPersistent(game: Game) {
    return {
      id: game.id,
      rate: game.rate,
      rule: game.rule,
      memo: game.memo,
      playedAt: game.playedAt,
      started: game.started,
      completed: game.completed,
      ownerId: game.ownerId,
    }
  }
}
