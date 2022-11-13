import dayjs from 'dayjs'
import { uuid } from 'uuidv4'
import { CreateGameRequestDTO, CreateGameResponseDTO } from './CreateGameDto'
import GameMapper from '@/domains/mapper/GameMapper'
import PlayerOnGameMapper from '@/domains/mapper/PlayerOnGameMapper'
import { GameRepo } from '@/repositories/gameRepo'
import { PlayerOnGameRepo } from '@/repositories/playerOnGameRepo'

export default class CreateGameUseCase {
  async execute(req: CreateGameRequestDTO): Promise<CreateGameResponseDTO> {
    console.log(req)
    const game = GameMapper.toDomain({
      id: uuid(),
      playedAt: dayjs().toDate(),
      started: false,
      ownerId: req.owner,
      rule: req.rule,
      rate: req.rate,
    })
    await GameRepo.createGame(game)
    await PlayerOnGameRepo.createPlayerOnGame(
      PlayerOnGameMapper.toDomain({
        playerId: req.owner,
        gameId: game.id,
        roundRecords: [],
      }),
    ).catch(async (err) => {
      await GameRepo.deleteGame({ id: game.id })
      throw err
    })
    return { id: game.id }
  }
}
