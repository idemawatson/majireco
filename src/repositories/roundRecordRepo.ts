import { RoundRecord } from '@/domains/entity/RoundRecord'
import RoundRecordMapper from '@/domains/mapper/RoundRecordMapper'
import prisma from '@/libs/prisma'
import { GameRate } from '@prisma/client'

export class RoundRecordRepo {
  static async createRoundRecords(entities: RoundRecord[]) {
    await prisma.roundRecord.createMany({
      data: entities.map(RoundRecordMapper.toPersistent),
    })
  }

  static async listRoundRecordsFilterByPlayedAt(
    playerId: string,
    query: { from: string; to: string; rate?: GameRate; targetPlayerId?: string },
  ) {
    const { from, to, rate, targetPlayerId } = query

    return await prisma.roundRecord.findMany({
      where: {
        playerOnGamePlayerId: { equals: playerId },
        playerOnGame: {
          game: {
            rate,
            completed: true,
            playedAt: { gte: new Date(from), lte: new Date(to) },
            belongingPlayers: targetPlayerId
              ? {
                  some: { playerId: targetPlayerId },
                }
              : undefined,
          },
        },
      },
      select: {
        rank: true,
        score: true,
        playerOnGame: {
          select: {
            game: {
              select: {
                rate: true,
              },
            },
          },
        },
      },
    })
  }
}
