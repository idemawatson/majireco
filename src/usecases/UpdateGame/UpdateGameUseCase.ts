import { UpdateGameRequestDto, UpdateGameResponseDto } from './UpdateGameDto'
import { GameRepo } from '@/repositories/gameRepo'

export default class UpdateGameUseCase {
  async execute(req: UpdateGameRequestDto): Promise<UpdateGameResponseDto> {
    await GameRepo.updateGame({
      id: req.gameId,
      rule: req.rule,
      rate: req.rate,
      memo: req.memo,
      started: req.started,
      completed: req.completed,
    })
    return { gameId: req.gameId }
  }
}
