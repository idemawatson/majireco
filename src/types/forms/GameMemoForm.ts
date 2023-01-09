import * as yup from 'yup'

type GameMemoModel = {
  memo?: string
}

export const schema: yup.SchemaOf<GameMemoModel> = yup.object().shape({
  memo: yup.string().max(1000, '1000文字以内で入力してください'),
})

export type IGameMemoForm = yup.InferType<typeof schema>
