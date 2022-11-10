import GameMapper from '@/domains/mapper/GameMapper'
import PlayerOnGameMapper from '@/domains/mapper/PlayerOnGameMapper'
import { GameRepo } from '@/repositories/gameRepo'
import { PlayerOnGameRepo } from '@/repositories/playerOnGameRepo'

import { CreateGameRequestDTO, CreateGameResponseDTO } from './CreateGameDto'

import dayjs from 'dayjs'
import { uuid } from 'uuidv4'

export default class CreateGameUseCase {
  async execute(req: CreateGameRequestDTO): Promise<CreateGameResponseDTO> {
    console.log(req)
    const game = GameMapper.toDomain({
      id: uuid(),
      playedAt: dayjs().toDate(),
      started: false,
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
