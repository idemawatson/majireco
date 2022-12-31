import { PrimitiveValueObject, ValueObject } from './valueObjects/BaseValueObjects'
import { EntityId } from './valueObjects/CommonValueObjects'
import { ValidationError } from '@/errors/error'
import { PLAYER_THEME_TYPE } from '@/libs/const'

export type PlayerProps = {
  id: EntityId
  name: PlayerName
  theme: PlayerTheme
}

export class Player extends ValueObject<PlayerProps> {
  constructor(props: PlayerProps) {
    super({
      id: new EntityId(props.id.value),
      name: new PlayerName(props.name.value),
      theme: new PlayerTheme(props.theme.value),
    })
  }
  get id() {
    return this._value.id._value
  }
  get name() {
    return this._value.name._value
  }
  get theme() {
    return this._value.theme._value
  }
}

export class PlayerName extends PrimitiveValueObject<string> {
  constructor(readonly _value: string) {
    if (_value.length > 100) throw new ValidationError('PlayerName is invalid.')
    super(_value)
  }
}

export class PlayerTheme extends PrimitiveValueObject<PLAYER_THEME_TYPE> {
  constructor(readonly _value: PLAYER_THEME_TYPE) {
    super(_value)
  }
}
