import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

import { apiHandler } from '@/libs/apiHelpers/apiRoutes'
import { CreatePlayerController } from '@/controllers/CreatePlayerController'

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

export default apiHandler({
  PUT: putHandler,
})
