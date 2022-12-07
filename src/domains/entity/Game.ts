import { GameRate as PrismaGameRate, GameRule as PrismaGameRule } from '@prisma/client'
import { Player } from './Player'
import { PlayerOnGame } from './PlayerOnGame'
import { RoundRecord } from './RoundRecord'
import { PrimitiveValueObject, ValueObject } from './valueObjects/BaseValueObjects'
import { BoolValue, DateValue, EntityId } from './valueObjects/CommonValueObjects'
import { InvalidDataError, ValidationError } from '@/errors/error'

export type GameProps = {
  id: EntityId
  playedAt: DateValue
  rule: GameRule
  rate: GameRate
  started: BoolValue
  completed: BoolValue
  ownerId: EntityId
  owner?: Player
  belongingPlayers?: PlayerOnGame[]
}

export type PlayerOnGameProps = Player & { roundRecords: RoundRecord[] }[]

export class Game extends ValueObject<GameProps> {
  constructor(props: GameProps) {
    if (props.belongingPlayers && props.belongingPlayers.length > 4)
      throw new ValidationError('belongingPlayers is invalid.')
    if (props.started.value !== true && props.completed.value === true)
      throw new InvalidDataError('started or completed is invalid.')
    super({
      id: new EntityId(props.id.value),
      playedAt: new DateValue(props.playedAt.value, 'playedAt'),
      rule: new GameRule(props.rule.value),
      rate: new GameRate(props.rate.value),
      started: new BoolValue(props.started.value),
      completed: new BoolValue(props.completed.value),
      ownerId: new EntityId(props.ownerId.value),
      owner: props.owner,
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
  get completed() {
    return this._value.completed._value
  }
  get ownerId() {
    return this._value.ownerId._value
  }
  get owner() {
    return this._value.owner
  }
  get belongingPlayers() {
    return this._value.belongingPlayers?.map((player) => player)
  }
  getPlayerOnGames(playerId: string) {
    return this._value.belongingPlayers?.find((bp) => playerId === bp.playerId)
  }
}

export class GameRule extends PrimitiveValueObject<PrismaGameRule> {
  constructor(readonly _value: PrismaGameRule) {
    if (!(Object.values(PrismaGameRule) as string[]).includes(_value))
      throw new ValidationError('GameRule is invalid.')
    super(_value)
  }
}

export class GameRate extends PrimitiveValueObject<PrismaGameRate> {
  constructor(readonly _value: PrismaGameRate) {
    if (!(Object.values(PrismaGameRate) as string[]).includes(_value))
      throw new ValidationError('GameRate is invalid.')
    super(_value)
  }
}
