import { shallowEqual } from 'shallow-equal-object'

export abstract class AbstractValueObject<T> {
  protected readonly _value: T

  protected constructor(_value: T) {
    this._value = Object.freeze(_value)
  }

  equals(target?: AbstractValueObject<T>): boolean {
    if (target == null) {
      return false
    }
    return shallowEqual(this._value, target._value)
  }
}

interface ValueObjectProps {
  [index: string]: any
}

export abstract class ValueObject<T extends ValueObjectProps> extends AbstractValueObject<T> {}

export abstract class PrimitiveValueObject<T> extends AbstractValueObject<T> {
  get value(): T {
    return this._value
  }
}
