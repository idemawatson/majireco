import { Player, PlayerName } from '../entity/Player'
import { EntityId } from '../entity/valueObjects/CommonValueObjects'

export type PlayerRawProps = {
  id: string
  name: string
}

export default class PlayerMapper {
  static toDomain(values: PlayerRawProps) {
    const { id, name } = values
    return new Player({
      id: new EntityId(id),
      name: new PlayerName(name),
    })
  }

  static toPersistent(player: Player) {
    return {
      id: player.id,
      name: player.name,
    }
  }
}
