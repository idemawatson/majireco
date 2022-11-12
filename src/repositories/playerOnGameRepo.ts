import { PlayerOnGame } from '@/domains/entity/PlayerOnGame'
import PlayerOnGameMapper from '@/domains/mapper/PlayerOnGameMapper'
import prisma from '@/libs/prisma'

export class PlayerOnGameRepo {
  static async createPlayerOnGame(entity: PlayerOnGame) {
    await prisma.playerOnGame.create({
      data: PlayerOnGameMapper.toPersistent(entity),
    })
  }
}
