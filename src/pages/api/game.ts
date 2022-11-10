import type { NextApiHandler } from 'next'
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0'

import { CreateGameController } from '@/controllers/CreateGameController'
import { GetGameController } from '@/controllers/GetGameController'

const handler: NextApiHandler = async (req, res) => {
  try {
    console.log(req.body)
    const session = getSession(req, res)
    if (session == null || session == undefined) {
      res.status(401).json({ ok: false, error: 'Not Authorized.' })
      return
    }
    if (req.method === 'PUT') {
      const controller = new CreateGameController()
      const game = await controller.createGame(req, session)
      res.json(game)
      return
    } else if (req.method === 'GET') {
      if (req.query.game_id == null || Array.isArray(req.query.game_id)) {
        res.status(500).json({ ok: false, error: 'Invalid Query Parameter' })
        return
      }
      const controller = new GetGameController()
      const game = await controller.getGame({ id: req.query.game_id })
      res.json(game)
    } else {
      res.status(404).json({ ok: false, error: 'Invalid Request Method' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ ok: false, error })
  }
}
export default withApiAuthRequired(handler)
