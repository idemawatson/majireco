import * as yup from 'yup'

type PlayerUpdateModel = {
  name: string
}

export const schema: yup.SchemaOf<PlayerUpdateModel> = yup.object().shape({
  name: yup
    .string()
    .required('プレイヤー名を入力してください')
    .max(50, '50文字以内で入力してください'),
})

export type IUpdatePlayerForm = yup.InferType<typeof schema>
