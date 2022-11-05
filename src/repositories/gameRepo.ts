import { GameRate, GameRule, PlayerOnGame } from '@prisma/client'
import prisma from '@/libs/prisma'
import dayjs from 'dayjs'

export class GameRepo {
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
    console.log(`START CREATE GAME.`)
    const game = await prisma.game.create({ data })
    console.log(`END CREATE GAME: ${JSON.stringify(game)}`)

    return game
  }

  static async updateGame(input: {
    id: string
    rule: GameRule
    rate: GameRate
    started: boolean
    belongingPlayers: PlayerOnGame[]
  }) {
    const data = {
      rule: input.rule,
      rate: input.rate,
      started: input.started,
      belongingPlayers: input.belongingPlayers,
    }
    console.log(`START UPDATE GAME.`)
    const game = await prisma.game.update({
      where: {
        id: input.id,
      },
      data,
    })
    console.log(`END UPDATE GAME: ${JSON.stringify(game)}`)

    return game
  }
}