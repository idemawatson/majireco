import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0'
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

import { apiHandler } from '@/libs/apiHelpers/apiRoutes'
import { CreateRoundRecordController } from '@/controllers/CreateRoundRecordController'
import { GetAggregatedRecordsController } from '@/controllers/GetAggregatedRecordsController'

const putHandler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('Start create RoundRecord.')
  const session = getSession(req, res)
  const controller = new CreateRoundRecordController()
  const game = await controller.createGame(req.body, session?.user.sub)
  res.json(game)
  console.log('End create RoundRecord.')
}

const getHandler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('Start get aggregated records.')
  const session = getSession(req, res)
  const controller = new GetAggregatedRecordsController()
  const records = await controller.execute({
    playerId: session?.user.sub,
    rate: req.query.rate as string,
    from: req.query.from as string,
    to: req.query.to as string,
    targetPlayerId: req.query.target as string,
  })
  res.json(records)
  console.log('End get aggregated records.')
}

export default apiHandler({
  PUT: withApiAuthRequired(putHandler),
  GET: withApiAuthRequired(getHandler),
})
