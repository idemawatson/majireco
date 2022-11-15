import { JoinPlayerToGameRequestDto, JoinPlayerToGameResponseDto } from './JoinPlayerToGameDto'
import PlayerOnGameMapper from '@/domains/mapper/PlayerOnGameMapper'
import { PlayerOnGameRepo } from '@/repositories/playerOnGameRepo'

export default class JoinPlayerToGameUseCase {
  async execute(req: JoinPlayerToGameRequestDto): Promise<JoinPlayerToGameResponseDto> {
    console.log(req)
    const playerOnGame = PlayerOnGameMapper.toDomain({
      playerId: req.playerId,
      gameId: req.gameId,
      roundRecords: [],
    })
    await PlayerOnGameRepo.createPlayerOnGame(playerOnGame)
    return { gameId: req.gameId }
  }
}
