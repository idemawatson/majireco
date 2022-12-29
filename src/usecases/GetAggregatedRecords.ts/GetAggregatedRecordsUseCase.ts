import { GetAggregatedRecordsResponseDTO } from './GetAggregatedRecordsDto'
import { RoundRecordRepo } from '@/repositories/roundRecordRepo'
import { GameRate } from '@prisma/client'
import dayjs from 'dayjs'

type Props = {
  playerId: string
  from: string
  to: string
  rate?: GameRate
  targetPlayerId?: string
}

export default class GetAggregatedRecordsUseCase {
  async execute({
    playerId,
    from,
    to,
    rate,
    targetPlayerId,
  }: Props): Promise<GetAggregatedRecordsResponseDTO> {
    const records = await RoundRecordRepo.listRoundRecordsFilterByPlayedAt(playerId, {
      from: dayjs(from, 'YYYYMM').startOf('month').toISOString(),
      to: dayjs(to, 'YYYYMM').endOf('month').toISOString(),
      rate,
      targetPlayerId,
    })
    if (!records.length)
      return {
        avgRank: 0,
        avgScore: 0,
        roundNum: 0,
      }
    const { totalRank, totalScore, roundNum } = records.reduce(
      (previous, current) => {
        previous.totalRank += current.rank
        previous.totalScore += current.score
        previous.roundNum += 1
        return previous
      },
      { totalRank: 0, totalScore: 0, roundNum: 0 },
    )
    return {
      avgRank: Math.round((totalRank / roundNum) * 100) / 100,
      avgScore: Math.round((totalScore / roundNum) * 100) / 100,
      roundNum,
    }
  }
}
