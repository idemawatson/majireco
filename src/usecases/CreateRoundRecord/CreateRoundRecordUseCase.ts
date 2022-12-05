import dayjs from 'dayjs'
import { uuid } from 'uuidv4'
import { CreateRoundRecordRequestDTO, CreateRoundRecordResponseDTO } from './CreateRoundRecordDto'
import { GameRepo } from '@/repositories/gameRepo'
import { GameInvalidDataError, GameNotFoundError, GameValidationError } from '@/errors/error'
import { RoundRecordRepo } from '@/repositories/roundRecordRepo'
import RoundRecordMapper from '@/domains/mapper/RoundRecordMapper'

type reqProps = CreateRoundRecordRequestDTO & {
  owner: string
}

export default class CreateRoundRecordUseCase {
  async execute(req: reqProps): Promise<CreateRoundRecordResponseDTO> {
    console.debug(`REQUEST BODY: , ${JSON.stringify(req)}`)
    const game = await GameRepo.getGame(req.gameId)

    if (!game) throw new GameNotFoundError()
    if (!game.started || !game.belongingPlayers) throw new GameInvalidDataError()

    const roundId = uuid()
    const createdAt = dayjs().toDate()
    const bpIds = game.belongingPlayers.map((bp) => bp.playerId)

    const roundRecords = req.scores
      .sort((a, b) => b.score - a.score)
      .map((scoreData, index) => {
        if (!bpIds.includes(scoreData.playerId)) throw new GameValidationError()
        return RoundRecordMapper.toDomain({
          id: uuid(),
          roundId,
          createdAt,
          rank: index + 1,
          score: scoreData.score,
          playerOnGameGameId: game.id,
          playerOnGamePlayerId: scoreData.playerId,
        })
      })
    await RoundRecordRepo.createRoundRecords(roundRecords)
    return { id: game.id }
  }
}
