import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { errorHandler } from './errorHandler'

const httpMethods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'] as const

type HttpMethod = typeof httpMethods[number]

const isHttpMethod = (method: string): method is HttpMethod => {
  return httpMethods.some((m) => m === method)
}

type Handlers = {
  [key in HttpMethod]?: NextApiHandler
}

export const apiHandler = (handlers: Handlers) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req
    console.debug(`REQUEST BODY: ${JSON.stringify(req.body)}`)

    if (!method || !isHttpMethod(method)) {
      return res.status(405).json({
        error: {
          message: `Method ${req.method} Not Allowed`,
          statusCode: 405,
        },
      })
    }

    const handler = handlers[method]

    if (!handler) {
      return res.status(405).json({
        error: {
          message: `Method ${req.method} Not Allowed`,
          statusCode: 405,
        },
      })
    }

    try {
      await handler(req, res)
    } catch (err) {
      errorHandler(err, res)
    }
  }
}
