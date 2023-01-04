import PlayerMapper from '@/domains/mapper/PlayerMapper'
import prisma from '@/libs/prisma'
import { Player } from '@/domains/entity/Player'

export class PlayerRepo {
  static async getPlayer(playerId: string) {
    const player = await prisma.player.findUnique({
      where: {
        id: playerId,
      },
    })
    if (!player) return null
    return PlayerMapper.toDomain(player)
  }

  static async createPlayer(player: Player) {
    const data = PlayerMapper.toPersistent(player)
    await prisma.player.create({ data })
  }

  static async updatePlayer(input: { id: string; name: string }) {
    const data = {
      name: input.name,
    }
    console.debug(`Call update player query. ${JSON.stringify(data)}`)
    const player = await prisma.player.update({
      where: {
        id: input.id,
      },
      data,
    })
    return PlayerMapper.toDomain(player)
  }
}
