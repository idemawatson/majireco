import dayjs from 'dayjs'
import { uuid } from 'uuidv4'
import { CreateGameRequestDTO, CreateGameResponseDTO } from './CreateGameDto'
import GameMapper from '@/domains/mapper/GameMapper'
import { GameRepo } from '@/repositories/gameRepo'

export default class CreateGameUseCase {
  async execute(req: CreateGameRequestDTO): Promise<CreateGameResponseDTO> {
    const game = GameMapper.toDomain({
      id: uuid(),
      playedAt: dayjs().toDate(),
      started: false,
      completed: false,
      ownerId: req.owner,
      rule: req.rule,
      rate: req.rate,
    })
    await GameRepo.createGame(game, req.owner)
    return { id: game.id }
  }
}
