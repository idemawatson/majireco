import { GAME_RULE_SELECTIONS } from './const'

const getRuleText = (value: string) =>
  GAME_RULE_SELECTIONS.find((rule) => rule.value === value)?.text

export default { getRuleText }
