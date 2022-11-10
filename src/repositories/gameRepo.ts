import { GameRate, GameRule, PlayerOnGame } from '@prisma/client'
import prisma from '@/libs/prisma'
import GameMapper from '@/domains/mapper/GameMapper'
import { Game } from '@/domains/entity/Game'

export class GameRepo {
  static async getGame(gameId: string) {
    const game = await prisma.game.findUnique({
      where: {
        id: gameId,
      },
      include: {
        belongingPlayers: {
          include: {
            player: true,
            roundRecords: true,
          },
        },
      },
    })
    if (!game) return null
    return GameMapper.toDomain(game)
  }

  static async createGame(game: Game) {
    const data = GameMapper.toPersistent(game)
    await prisma.game.create({ data: data })
  }

  static async updateGame(input: {
    id: string
    rule?: GameRule
    rate?: GameRate
    started?: boolean
    belongingPlayers?: PlayerOnGame[]
  }) {
    const data = {
      rule: input.rule,
      rate: input.rate,
      started: input.started,
      belongingPlayers: input.belongingPlayers,
    }
    const game = await prisma.game.update({
      where: {
        id: input.id,
      },
      data,
    })
    return GameMapper.toDomain(game)
  }

  static async deleteGame(input: { id: string }) {
    await prisma.game.delete({
      where: {
        id: input.id,
      },
    })
  }
}
