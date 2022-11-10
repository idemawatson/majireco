import dayjs from 'dayjs'
import { PrimitiveValueObject } from './BaseValueObjects'
import { uuid } from 'uuidv4'

export class EntityId extends PrimitiveValueObject<string> {
  constructor(readonly _value: string) {
    super(_value)
  }
  static create() {
    return new EntityId(uuid())
  }
}

export class DateValue extends PrimitiveValueObject<Date> {
  constructor(readonly _value: Date, keyName: string) {
    if (!dayjs(_value).isValid()) throw new Error(`${keyName} is invalid.`)
    super(_value)
  }
  static current(keyName: string) {
    return new DateValue(dayjs().toDate(), keyName)
  }
}

export class BoolValue extends PrimitiveValueObject<boolean> {
  constructor(readonly _value: boolean) {
    super(_value)
  }
}

export class EmailValue extends PrimitiveValueObject<string> {
  static EMAIL_REGEX = /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/
  constructor(readonly _value: string) {
    if (EmailValue.EMAIL_REGEX.test(_value)) throw new Error(`email is invalid.`)
    super(_value)
  }
}
