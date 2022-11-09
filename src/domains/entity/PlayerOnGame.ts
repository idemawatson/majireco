import { RoundRecord } from './RoundRecord'
import { ValueObject } from './valueObjects/BaseValueObjects'
import { EntityId } from './valueObjects/CommonValueObjects'

export type PlayerOnGameProps = {
  playerId: EntityId
  gameId: EntityId
  roundRecords: RoundRecord[]
}

export class PlayerOnGame extends ValueObject<PlayerOnGameProps> {
  constructor(props: PlayerOnGameProps) {
    super({
      playerId: new EntityId(props.playerId.value),
      gameId: new EntityId(props.gameId.value),
      roundRecords: props.roundRecords,
    })
  }
  addRoundRecord(record: RoundRecord) {
    this.roundRecords.push(record)
  }
  get playerId() {
    return this._value.playerId._value
  }
  get gameId() {
    return this._value.gameId._value
  }
  get roundRecords() {
    return this._value.roundRecords
  }
}
