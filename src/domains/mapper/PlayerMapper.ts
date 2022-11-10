import { Player, PlayerName } from '../entity/Player'
import { EmailValue, EntityId } from '../entity/valueObjects/CommonValueObjects'

export type PlayerRawProps = {
  id: string
  email: string
  name: string
}

export default class PlayerMapper {
  static toDomain(values: PlayerRawProps) {
    const { id, email, name } = values
    return new Player({
      id: new EntityId(id),
      email: new EmailValue(email),
      name: new PlayerName(name),
    })
  }
}
