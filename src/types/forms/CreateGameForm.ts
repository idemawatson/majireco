import { GAME_RATES, GAME_RATES_TYPE, GAME_RULES, GAME_RULES_TYPE } from '@/libs/const'
import * as yup from 'yup'

type GameCreateModel = {
  gameRule: GAME_RULES_TYPE
  gameRate: GAME_RATES_TYPE
}

export const schema: yup.SchemaOf<GameCreateModel> = yup.object().shape({
  gameRule: yup.mixed().oneOf(GAME_RULES.concat([])).required('配点ルールを選択してください'),
  gameRate: yup.mixed().oneOf(GAME_RATES.concat([])).required('レートを指定してください'),
})

export type Form = yup.InferType<typeof schema>
