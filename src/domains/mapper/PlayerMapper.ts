import { PLAYER_THEME_TYPE } from '@/libs/const'
import { Player, PlayerName, PlayerTheme } from '../entity/Player'
import { EntityId } from '../entity/valueObjects/CommonValueObjects'

export type PlayerRawProps = {
  id: string
  name: string
  theme: PLAYER_THEME_TYPE
}

export default class PlayerMapper {
  static toDomain(values: PlayerRawProps) {
    const { id, name, theme } = values
    return new Player({
      id: new EntityId(id),
      name: new PlayerName(name),
      theme: new PlayerTheme(theme),
    })
  }

  static toPersistent(player: Player) {
    return {
      id: player.id,
      name: player.name,
      theme: player.theme,
    }
  }
}
