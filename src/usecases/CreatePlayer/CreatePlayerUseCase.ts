import { CreatePlayerRequestDTO, CreatePlayerResponseDTO } from './CreatePlayerDto'
import PlayerMapper from '@/domains/mapper/PlayerMapper'
import { PLAYER_THEME } from '@/libs/const'
import { PlayerRepo } from '@/repositories/playerRepo'

export default class CreatePlayerUseCase {
  async execute(req: CreatePlayerRequestDTO): Promise<CreatePlayerResponseDTO> {
    const player = PlayerMapper.toDomain({
      id: req.playerId,
      name: req.name,
      theme: PLAYER_THEME.T1,
    })
    await PlayerRepo.createPlayer(player)
    return { id: req.playerId }
  }
}
