import { RoundRecord } from '@/domains/entity/RoundRecord'
import RoundRecordMapper from '@/domains/mapper/RoundRecordMapper'
import prisma from '@/libs/prisma'

export class RoundRecordRepo {
  static async createRoundRecords(entities: RoundRecord[]) {
    await prisma.roundRecord.createMany({
      data: entities.map(RoundRecordMapper.toPersistent),
    })
  }
}
