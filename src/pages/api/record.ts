import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0'
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

import { CreateRoundRecordController } from '@/controllers/CreateRoundRecordController'
import { DeleteRoundRecordController } from '@/controllers/DeleteRoundRecordController'
import { GetAggregatedRecordsController } from '@/controllers/GetAggregatedRecordsController'
import { apiHandler } from '@/libs/apiHelpers/apiRoutes'

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

const deleteHandler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('Start delete records.')
  const session = getSession(req, res)
  const controller = new DeleteRoundRecordController()
  await controller.execute(req.query.roundId as string, session?.user.sub)
  console.log('End delete records.')
  res.end()
}

export default apiHandler({
  PUT: withApiAuthRequired(putHandler),
  GET: withApiAuthRequired(getHandler),
  DELETE: withApiAuthRequired(deleteHandler),
})
