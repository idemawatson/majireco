import { GAME_RATE_SELECTIONS } from './const'

const getRateText = (value: string) =>
  GAME_RATE_SELECTIONS.find((rate) => rate.value === value)?.text

export default { getRateText }
