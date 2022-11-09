import { GameRate, GameRule, PlayerOnGame } from '@prisma/client'
import prisma from '@/libs/prisma'
import dayjs from 'dayjs'
import GameFactory from '@/domains/factory/GameFactory'

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
    const factory = new GameFactory()
    if (!game) return null
    return factory.fromRaw(game)
  }

  static async createGame(input: {
    rule: GameRule
    rate: GameRate
    belongingPlayers?: PlayerOnGame[]
  }) {
    const data = {
      playedAt: dayjs().toISOString(),
      rule: input.rule,
      rate: input.rate,
      started: false,
      belongingPlayers: input.belongingPlayers || undefined,
    }
    const game = await prisma.game.create({ data })
    const factory = new GameFactory()
    return factory.fromRaw(game)
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
    const factory = new GameFactory()
    return factory.fromRaw(game)
  }

  static async deleteGame(input: { id: string }) {
    await prisma.game.delete({
      where: {
        id: input.id,
      },
    })
  }
}
