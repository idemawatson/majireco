import {
  GameRate as PrismaGameRate,
  GameRule as PrismaGameRule,
  Game as PrismaGame,
  PlayerOnGame as PrismaPlayerOnGame,
  RoundRecord as PrismaRoundRecord,
} from '@prisma/client'
import { Game, GameRate, GameRule } from '../entity/Game'
import { BoolValue, DateValue, EntityId } from '../entity/valueObjects/CommonValueObjects'
import PlayerOnGameFactory from './PlayerOnGameFactory'

type GameRawProps = PrismaGame & {
  belongingPlayers?: (PrismaPlayerOnGame & { roundRecords: PrismaRoundRecord[] })[]
}

export default class GameFactory {
  create(props: {
    rule: PrismaGameRule
    rate: PrismaGameRate
    belongingPlayers: PrismaPlayerOnGame[]
  }): Game {
    return new Game({
      id: EntityId.create(),
      rule: new GameRule(props.rule),
      rate: new GameRate(props.rate),
      playedAt: DateValue.current('playedAt'),
      started: new BoolValue(false),
      belongingPlayers: props.belongingPlayers.map((bp) => {
        return PlayerOnGameFactory.fromRaw({ ...bp, roundRecords: [] })
      }),
    })
  }

  fromRaw(values: GameRawProps): Game {
    const { id, playedAt, rate, rule, started, belongingPlayers } = values
    return new Game({
      id: new EntityId(id),
      rule: new GameRule(rule),
      rate: new GameRate(rate),
      playedAt: new DateValue(playedAt.toISOString(), 'playedAt'),
      started: new BoolValue(started),
      belongingPlayers: belongingPlayers?.map(PlayerOnGameFactory.fromRaw),
    })
  }
}
