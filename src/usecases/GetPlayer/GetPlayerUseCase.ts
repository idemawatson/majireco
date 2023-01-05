import { GetPlayerRequestDTO } from './GetPlayerDto'
import { Player } from '@/domains/entity/Player'
import { PlayerNotFoundError } from '@/errors/error'
import { PlayerRepo } from '@/repositories/playerRepo'

export default class GetPlayerUseCase {
  async execute(input: GetPlayerRequestDTO): Promise<Player> {
    const player = await PlayerRepo.getPlayer(input.id)
    if (player == null) {
      throw new PlayerNotFoundError('player is not found.')
    }
    return player
  }
}
