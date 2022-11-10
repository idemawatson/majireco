import prisma from '@/libs/prisma'
import PlayerOnGameMapper from '@/domains/mapper/PlayerOnGameMapper'
import { PlayerOnGame } from '@/domains/entity/PlayerOnGame'

export class PlayerOnGameRepo {
  static async createPlayerOnGame(entity: PlayerOnGame) {
    await prisma.playerOnGame.create({
      data: PlayerOnGameMapper.toPersistent(entity),
    })
  }
}
