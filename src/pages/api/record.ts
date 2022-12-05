import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0'
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

import { apiHandler } from '@/libs/apiHelpers/apiRoutes'
import { CreateRoundRecordController } from '@/controllers/CreateRoundRecordController'

const putHandler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('Start create RoundRecord.')
  const session = getSession(req, res)
  const controller = new CreateRoundRecordController()
  const game = await controller.createGame(req.body, session?.user.sub)
  res.json(game)
  console.log('End create RoundRecord.')
}

export default apiHandler({
  PUT: withApiAuthRequired(putHandler),
})
