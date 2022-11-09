import { GameRepo } from '@/repositories/gameRepo'

export default class GetGameUseCase {
  async exec(input: { gameId: string }) {
    const game = await GameRepo.getGame(input.gameId)
    return game
  }
}
