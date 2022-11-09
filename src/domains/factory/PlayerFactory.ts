import { Player as PrismaPlayer } from '@prisma/client'
import { Player, PlayerName } from '../entity/Player'
import { EmailValue, EntityId } from '../entity/valueObjects/CommonValueObjects'

export default class PlayerFactory {
  static fromRaw(values: PrismaPlayer) {
    const { id, email, name } = values
    return new Player({
      id: new EntityId(id),
      email: new EmailValue(email),
      name: new PlayerName(name),
    })
  }
}
