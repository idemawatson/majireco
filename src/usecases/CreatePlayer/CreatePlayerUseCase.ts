import { CreatePlayerRequestDTO, CreatePlayerResponseDTO } from './CreatePlayerDto'
import PlayerMapper from '@/domains/mapper/PlayerMapper'
import { PlayerRepo } from '@/repositories/playerRepo'

export default class CreatePlayerUseCase {
  async execute(req: CreatePlayerRequestDTO): Promise<CreatePlayerResponseDTO> {
    const player = PlayerMapper.toDomain({
      id: req.playerId,
      name: req.name,
    })
    await PlayerRepo.createPlayer(player)
    return { id: req.playerId }
  }
}
