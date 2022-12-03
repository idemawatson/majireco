import * as yup from 'yup'
import { GAME_RATES, GAME_RATES_TYPE, GAME_RULES, GAME_RULES_TYPE } from '@/libs/const'

type GameCreateModel = {
  rule: GAME_RULES_TYPE
  rate: GAME_RATES_TYPE
}

export const schema: yup.SchemaOf<GameCreateModel> = yup.object().shape({
  rule: yup.mixed().oneOf(GAME_RULES.concat([])).required('配点ルールを選択してください'),
  rate: yup.mixed().oneOf(GAME_RATES.concat([])).required('レートを指定してください'),
})

export type ICreateGameForm = yup.InferType<typeof schema>
