export const GAME_RULES = ['RULE_1020', 'RULE_1030'] as const
export type GAME_RULES_TYPE = typeof GAME_RULES[number]
export const GAME_RULE_SELECTIONS = [
  { text: '10-20', value: 'RULE_1020' },
  { text: '10-30', value: 'RULE_1030' },
]

export const GAME_RATES = ['NO_RATE', 'PER_10', 'PER_30', 'PER_50'] as const
export type GAME_RATES_TYPE = typeof GAME_RATES[number]
export const GAME_RATE_SELECTIONS = [
  { text: 'ノーレート', value: 'NO_RATE' },
  { text: '点1', value: 'PER_10' },
  { text: '点3', value: 'PER_30' },
  { text: '点5', value: 'PER_50' },
]

export const PLAYER_THEME = {
  T1: 'T1',
  T2: 'T2',
  T3: 'T3',
  T4: 'T4',
  T5: 'T5',
  T6: 'T6',
  T7: 'T7',
  T8: 'T8',
} as const
export type PLAYER_THEME_TYPE = typeof PLAYER_THEME[keyof typeof PLAYER_THEME]
