import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0'
import type { NextApiRequest, NextApiResponse } from 'next'

import { ListGamesController } from '@/controllers/ListGamesController'
import { apiHandler } from '@/libs/apiHelpers/apiRoutes'

const getHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = getSession(req, res)
  const controller = new ListGamesController()
  const games = await controller.listGames(session?.user.sub)
  res.json(games)
}

export default apiHandler({
  GET: withApiAuthRequired(getHandler),
})
