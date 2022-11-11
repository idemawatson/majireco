import { ValidationError } from '@/errors/error'
import { PrimitiveValueObject, ValueObject } from './valueObjects/BaseValueObjects'
import { DateValue, EntityId } from './valueObjects/CommonValueObjects'

export type RoundRecordProps = {
  id: EntityId
  createdAt: DateValue
  rank: RoundRecordRankValue
  score: RoundRecordScoreValue
}

export class RoundRecord extends ValueObject<RoundRecordProps> {
  constructor(props: RoundRecordProps) {
    super({
      id: new EntityId(props.id.value),
      createdAt: new DateValue(props.createdAt.value, 'createdAt'),
      rank: new RoundRecordRankValue(props.rank.value),
      score: new RoundRecordScoreValue(props.score.value),
    })
  }
  get id() {
    return this._value.id._value
  }
  get createdAt() {
    return this._value.createdAt._value
  }
  get rank() {
    return this._value.rank._value
  }
  get score() {
    return this._value.score._value
  }
}

export class RoundRecordRankValue extends PrimitiveValueObject<number> {
  constructor(readonly _value: number) {
    if ([1, 2, 3, 4].includes(_value)) throw new ValidationError(`RoundRecordRankValue is invalid.`)
    super(_value)
  }
}

export class RoundRecordScoreValue extends PrimitiveValueObject<number> {
  constructor(readonly _value: number) {
    if (_value < -1000000 || _value > 1000000)
      throw new ValidationError(`RoundRecordScoreValue is invalid.`)
    super(_value)
  }
}
