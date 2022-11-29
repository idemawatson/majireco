import { Game } from '@/domains/entity/Game'
import { GameInvalidDataError } from '@/errors/error'
import { GetGameResponseDTO } from '@/usecases/GetGame/GetGameDto'

export default class GetGamePresenter {
  toViewModel(game: Game): GetGameResponseDTO {
    if (!game.owner) {
      throw new GameInvalidDataError('game data is invalid.')
    }
    const { belongingPlayers, roundRecords } = game.belongingPlayers?.reduce(
      (previous, bg) => {
        previous.belongingPlayers.push({
          playerId: bg.playerId,
          playerName: bg.player?.name || '',
        })
        bg.roundRecords.forEach((record) => {
          const gameRecord = previous.roundRecords[record.roundId]
          const recordViewModel = { playerId: bg.playerId, rank: record.rank, score: record.score }
          if (gameRecord) gameRecord.push(recordViewModel)
          else previous.roundRecords[record.roundId] = [recordViewModel]
        })
        return previous
      },
      { belongingPlayers: [], roundRecords: {} } as Pick<
        GetGameResponseDTO,
        'belongingPlayers' | 'roundRecords'
      >,
    ) || { belongingPlayers: [], roundRecords: {} }

    return {
      id: game.id,
      rate: game.rate,
      rule: game.rule,
      started: game.started,
      playedAt: game.playedAt.toISOString(),
      owner: {
        id: game.owner.id,
        name: game.owner.name,
      },
      belongingPlayers,
      roundRecords,
    }
  }
}
