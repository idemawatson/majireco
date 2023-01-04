import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0'
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

import { CreateGameController } from '@/controllers/CreateGameController'
import { GetGameController } from '@/controllers/GetGameController'
import { JoinPlayerToGameController } from '@/controllers/JoinPlayerToGameController'
import { apiHandler } from '@/libs/apiHelpers/apiRoutes'
import { UpdateGameController } from '@/controllers/UpdateGameController'
import { DeleteGameController } from '@/controllers/DeleteGameController'

const putHandler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = getSession(req, res)
  const controller = new CreateGameController()
  const game = await controller.createGame(req.body, session?.user.sub)
  res.json(game)
}

const getHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const controller = new GetGameController()
  const game = await controller.getGame(req.query.game_id as string)
  res.json(game)
}

const patchHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = getSession(req, res)
  const controller = new JoinPlayerToGameController()
  const dto = await controller.joinPlayerToGame({
    gameId: req.body.gameId,
    playerId: session?.user.sub,
  })
  res.json(dto)
}

const postHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = getSession(req, res)
  const controller = new UpdateGameController()
  const dto = await controller.updateGame({
    ...req.body,
    playerId: session?.user.sub,
  })
  res.json(dto)
}

const deleteHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = getSession(req, res)
  await new DeleteGameController().deleteGame(req.query.game_id as string, session?.user.sub)
  res.json({})
}

export default apiHandler({
  GET: withApiAuthRequired(getHandler),
  PUT: withApiAuthRequired(putHandler),
  PATCH: withApiAuthRequired(patchHandler),
  POST: withApiAuthRequired(postHandler),
  DELETE: withApiAuthRequired(deleteHandler),
})
