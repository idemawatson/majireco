import { PrimitiveValueObject, ValueObject } from './valueObjects/BaseValueObjects'
import { EntityId } from './valueObjects/CommonValueObjects'
import { ValidationError } from '@/errors/error'

export type PlayerProps = {
  id: EntityId
  name: PlayerName
}

export class Player extends ValueObject<PlayerProps> {
  constructor(props: PlayerProps) {
    super({
      id: new EntityId(props.id.value),
      name: new PlayerName(props.name.value),
    })
  }
  get id() {
    return this._value.id._value
  }
  get name() {
    return this._value.name._value
  }
}

export class PlayerName extends PrimitiveValueObject<string> {
  constructor(readonly _value: string) {
    if (_value.length > 100) throw new ValidationError('PlayerName is invalid.')
    super(_value)
  }
}
