import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0'
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

import { CreatePlayerController } from '@/controllers/CreatePlayerController'
import { GetPlayerController } from '@/controllers/GetPlayerController'
import { UpdatePlayerController } from '@/controllers/UpdatePlayerController'
import { apiHandler } from '@/libs/apiHelpers/apiRoutes'

const putHandler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('Start create Player.')
  const controller = new CreatePlayerController()
  const player = await controller.createPlayer({
    playerId: req.body.playerId,
    name: req.body.name,
  })
  res.json(player)
  console.log('End create Player.')
}

const getHandler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('Start get Player.')
  const session = getSession(req, res)
  const controller = new GetPlayerController()
  const player = await controller.getPlayer(session?.user.sub)
  res.json(player)
  console.log('End get Player.')
}

const postHandler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('Start update Player.')
  const session = getSession(req, res)
  const controller = new UpdatePlayerController()
  const player = await controller.updatePlayer({ playerId: session?.user.sub, name: req.body.name })
  res.json(player)
  console.log('End update Player.')
}

export default apiHandler({
  PUT: putHandler,
  GET: withApiAuthRequired(getHandler),
  POST: withApiAuthRequired(postHandler),
})
