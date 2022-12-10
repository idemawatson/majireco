import { GAME_RULE_SELECTIONS } from './const'

export const getRuleText = (value: string) =>
  GAME_RULE_SELECTIONS.find((rule) => rule.value === value)?.text
