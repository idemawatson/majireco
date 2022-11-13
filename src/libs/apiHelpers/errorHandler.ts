import { NextApiResponse } from 'next'
import { NotFoundError, ValidationError } from '@/errors/error'

export const errorHandler = (error: any, res: NextApiResponse) => {
  console.error(error)
  if (error instanceof ValidationError) {
    return res.status(400).json({ message: error.message, statusCode: 400 })
  }
  if (error instanceof NotFoundError) {
    return res.status(404).json({ message: error.message, statusCode: 502 })
  }

  // その他予期してないエラーに対する処理
  return res.status(500).json({ message: error.message, statusCode: 500 })
}
