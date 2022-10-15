export const GAME_RULES = ['10-20', '10-30'] as const
export type GAME_RULES_TYPE = typeof GAME_RULES[number]

export const GAME_RATES = ['点1', '点3', '点5', 'ノーレート'] as const
export type GAME_RATES_TYPE = typeof GAME_RATES[number]
