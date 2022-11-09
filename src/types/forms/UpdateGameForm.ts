import { GAME_RATES, GAME_RATES_TYPE, GAME_RULES, GAME_RULES_TYPE } from '@/libs/const'
import * as yup from 'yup'

type GameUpdateModel = {
  rule: GAME_RULES_TYPE
  rate: GAME_RATES_TYPE
}

export const schema: yup.SchemaOf<GameUpdateModel> = yup.object().shape({
  rule: yup.mixed().oneOf(GAME_RULES.concat([])).required('配点ルールを選択してください'),
  rate: yup.mixed().oneOf(GAME_RATES.concat([])).required('レートを指定してください'),
})

export type IUpdateGameForm = yup.InferType<typeof schema> & {
  belongingPlayers: String[]
  started: boolean
}
