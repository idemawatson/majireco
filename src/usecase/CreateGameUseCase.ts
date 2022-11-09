import PlayerOnGameFactory from '@/domains/factory/PlayerOnGameFactory'
import { GameRepo } from '@/repositories/gameRepo'
import { GameRate, GameRule } from '@prisma/client'

export default class CreateGameUseCase {
  async exec(input: { rule: GameRule; rate: GameRate; owner: string }) {
    const game = await GameRepo.createGame({ ...input, belongingPlayers: [] })
    const playerOnGame = PlayerOnGameFactory.fromRaw({
      playerId: input.owner,
      gameId: game.id,
      roundRecords: [],
    })
    return await GameRepo.updateGame({ id: game.id, belongingPlayers: [playerOnGame] }).catch(
      async (err) => {
        await GameRepo.deleteGame({ id: game.id })
        throw err
      },
    )
  }
}
