import type { NextApiHandler } from 'next'
import prisma from '@/libs/prisma'
import dayjs from 'dayjs'
import { withApiAuthRequired } from '@auth0/nextjs-auth0'
import { GameRepo } from '@/repositories/gameRepo'

const handler: NextApiHandler = async (req, res) => {
  try {
    console.log(req.body)
    if (req.method === 'PUT') {
      const game = await GameRepo.createGame(req.body)
      res.json(game)
      return
    } else if (req.method === 'GET') {
      if (req.query.game_id == null || Array.isArray(req.query.game_id)) {
        res.status(500).json({ ok: false, error: 'Invalid Query Parameter' })
        return
      }
      const game = await prisma.game.findUnique({
        where: {
          id: req.query.game_id,
        },
        include: {
          belongingPlayers: {
            include: {
              player: true,
            },
          },
        },
      })
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
