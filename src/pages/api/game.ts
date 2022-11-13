import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0'
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

import { CreateGameController } from '@/controllers/CreateGameController'
import { GetGameController } from '@/controllers/GetGameController'
import { JoinPlayerToGameController } from '@/controllers/JoinPlayerToGameController'
import { apiHandler } from '@/libs/apiHelpers/apiRoutes'

const putHandler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = getSession(req, res)
  const controller = new CreateGameController()
  const game = await controller.createGame(req.body, session?.user.email)
  res.json(game)
}

const getHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const controller = new GetGameController()
  const game = await controller.getGame(req.query.game_id as string)
  res.json(game)
}

const patchHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const controller = new JoinPlayerToGameController()
  const dto = await controller.joinPlayerToGame(req.body)
  res.json(dto)
}

export default apiHandler({
  GET: withApiAuthRequired(getHandler),
  PUT: withApiAuthRequired(putHandler),
  PATCH: withApiAuthRequired(patchHandler),
})
