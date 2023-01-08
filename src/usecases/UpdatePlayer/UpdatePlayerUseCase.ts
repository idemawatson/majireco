import { UpdatePlayerRequestDTO, UpdatePlayerResponseDTO } from './UpdatePlayerDto'
import PlayerMapper from '@/domains/mapper/PlayerMapper'
import { PlayerRepo } from '@/repositories/playerRepo'

export default class UpdatePlayerUseCase {
  async execute(
    req: UpdatePlayerRequestDTO & { playerId: string },
  ): Promise<UpdatePlayerResponseDTO> {
    const player = PlayerMapper.toDomain({
      id: req.playerId,
      name: req.name,
    })
    return await PlayerRepo.updatePlayer(player)
  }
}
