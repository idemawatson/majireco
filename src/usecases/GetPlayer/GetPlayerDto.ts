import { PLAYER_THEME_TYPE } from '@/libs/const'

export type GetPlayerRequestDTO = {
  id: string
}

export interface GetPlayerResponseDTO {
  id: string
  name: string
  theme: PLAYER_THEME_TYPE
}
