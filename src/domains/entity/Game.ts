import { GameRate as PrismaGameRate, GameRule as PrismaGameRule } from '@prisma/client'
import { Player } from './Player'
import { PlayerOnGame } from './PlayerOnGame'
import { RoundRecord } from './RoundRecord'
import { PrimitiveValueObject, ValueObject } from './valueObjects/BaseValueObjects'
import { BoolValue, DateValue, EntityId } from './valueObjects/CommonValueObjects'

export type GameProps = {
  id: EntityId
  playedAt: DateValue
  rule: GameRule
  rate: GameRate
  started: BoolValue
  belongingPlayers?: PlayerOnGame[]
}

export type PlayerOnGameProps = Player & { roundRecords: RoundRecord[] }[]

export class Game extends ValueObject<GameProps> {
  constructor(props: GameProps) {
    if (props.belongingPlayers && props.belongingPlayers.length > 4)
      throw new Error('belongingPlayers is invalid.')
    super({
      id: new EntityId(props.id.value),
      playedAt: new DateValue(props.playedAt.value, 'playedAt'),
      rule: new GameRule(props.rule.value),
      rate: new GameRate(props.rate.value),
      started: new BoolValue(props.started.value),
      belongingPlayers: props.belongingPlayers,
    })
  }
  get id() {
    return this._value.id._value
  }
  get playedAt() {
    return this._value.playedAt._value
  }
  get rule() {
    return this._value.rule._value
  }
  get rate() {
    return this._value.rate._value
  }
  get started() {
    return this._value.started._value
  }
  get belongingPlayers() {
    return this._value.belongingPlayers?.map((player) => player)
  }
  getPlayerOnGames(playerId: string) {
    return this._value.belongingPlayers?.find((bp) => playerId === bp.playerId)
  }
  addPlayerOnGame(player: PlayerOnGame) {
    this._value.belongingPlayers?.push(player)
  }
}

export class GameRule extends PrimitiveValueObject<PrismaGameRule> {
  constructor(readonly _value: PrismaGameRule) {
    super(_value)
  }
}

export class GameRate extends PrimitiveValueObject<PrismaGameRate> {
  constructor(readonly _value: PrismaGameRate) {
    super(_value)
  }
}
