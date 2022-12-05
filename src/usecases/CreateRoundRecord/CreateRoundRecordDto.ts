export type CreateRoundRecordRequestDTO = {
  gameId: string
  scores: { playerId: string; score: number }[]
}

export interface CreateRoundRecordResponseDTO {
  id: string
}
