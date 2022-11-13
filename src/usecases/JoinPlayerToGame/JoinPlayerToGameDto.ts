export type JoinPlayerToGameRequestDto = {
  gameId: string
  playerId: string
}

export interface JoinPlayerToGameResponseDto {
  gameId: string
}
