import * as yup from 'yup'

type RecordCreateModel = {
  player1_score: number
  player2_score: number
  player3_score: number
  player4_score: number
}

export const schema: yup.SchemaOf<RecordCreateModel> = yup.object().shape({
  player1_score: yup
    .number()
    .integer()
    .min(-100000, '値が不正です')
    .max(100000, '値が不正です')
    .required('得点を入力してください'),
  player2_score: yup
    .number()
    .integer()
    .min(-100000, '値が不正です')
    .max(100000, '値が不正です')
    .required('得点を入力してください'),
  player3_score: yup
    .number()
    .integer()
    .min(-100000, '値が不正です')
    .max(100000, '値が不正です')
    .required('得点を入力してください'),
  player4_score: yup
    .number()
    .integer()
    .min(-100000, '値が不正です')
    .max(100000, '値が不正です')
    .required('得点を入力してください'),
})

export type ICreateRecordForm = yup.InferType<typeof schema>
