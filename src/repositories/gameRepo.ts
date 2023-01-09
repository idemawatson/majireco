import { GameRate, GameRule } from '@prisma/client'
import { Game, GameMemo } from '@/domains/entity/Game'
import GameMapper from '@/domains/mapper/GameMapper'
import prisma from '@/libs/prisma'

export class GameRepo {
  static async getGame(gameId: string) {
    const game = await prisma.game.findUnique({
      where: {
        id: gameId,
      },
      include: {
        owner: true,
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

  static async listGame(playerId: string) {
    const games = await prisma.game.findMany({
      where: {
        belongingPlayers: {
          some: { playerId },
        },
      },
      include: {
        owner: true,
        belongingPlayers: {
          include: {
            player: true,
          },
        },
      },
      orderBy: {
        playedAt: 'desc',
      },
    })
    return games.map((game) => GameMapper.toDomain(game))
  }

  static async createGame(game: Game, createdBy: string) {
    const data = GameMapper.toPersistent(game)
    await prisma.game.create({
      data: {
        ...data,
        belongingPlayers: {
          create: [
            {
              playerId: createdBy,
            },
          ],
        },
      },
    })
  }

  static async updateGame(input: {
    id: string
    rule?: GameRule
    rate?: GameRate
    memo?: string
    started?: boolean
    completed?: boolean
  }) {
    const data = {
      rule: input.rule,
      rate: input.rate,
      memo: input.memo,
      started: input.started,
      completed: input.completed,
    }
    const game = await prisma.game.update({
      where: {
        id: input.id,
      },
      data,
    })
    return GameMapper.toDomain(game)
  }

  static async deleteGame(input: { gameId: string }) {
    await prisma.game.delete({
      where: {
        id: input.gameId,
      },
    })
  }
}
