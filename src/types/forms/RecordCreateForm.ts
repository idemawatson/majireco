import * as yup from 'yup'

type RecordCreateModel = {
  p1Point: number
  p2Point: number
  p3Point: number
  p4Point: number
  p1Score: number
  p2Score: number
  p3Score: number
  p4Score: number
}

export const schema: yup.SchemaOf<RecordCreateModel> = yup.object().shape({
  p1Point: yup
    .number()
    .required('得点を入力してください')
    .integer('数値を入力してください')
    .typeError('数値を入力してください')
    .min(-100000, '値が不正です')
    .max(100000, '値が不正です'),
  p2Point: yup
    .number()
    .required('得点を入力してください')
    .integer('数値を入力してください')
    .typeError('数値を入力してください')
    .min(-100000, '値が不正です')
    .max(100000, '値が不正です'),
  p3Point: yup
    .number()
    .required('得点を入力してください')
    .integer('数値を入力してください')
    .typeError('数値を入力してください')
    .min(-100000, '値が不正です')
    .max(100000, '値が不正です'),
  p4Point: yup
    .number()
    .required('得点を入力してください')
    .integer('数値を入力してください')
    .typeError('数値を入力してください')
    .min(-100000, '値が不正です')
    .max(100000, '値が不正です'),
  p1Score: yup
    .number()
    .required('スコアを入力してください')
    .integer('数値を入力してください')
    .typeError('数値を入力してください')
    .min(-1000, '値が不正です')
    .max(1000, '値が不正です'),
  p2Score: yup
    .number()
    .required('スコアを入力してください')
    .integer('数値を入力してください')
    .typeError('数値を入力してください')
    .min(-1000, '値が不正です')
    .max(1000, '値が不正です'),
  p3Score: yup
    .number()
    .required('スコアを入力してください')
    .integer('数値を入力してください')
    .typeError('数値を入力してください')
    .min(-1000, '値が不正です')
    .max(1000, '値が不正です'),
  p4Score: yup
    .number()
    .required('スコアを入力してください')
    .integer('数値を入力してください')
    .typeError('数値を入力してください')
    .min(-1000, '値が不正です')
    .max(1000, '値が不正です'),
})

export type IRecordCreateForm = yup.InferType<typeof schema>
