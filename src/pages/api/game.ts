import type { NextApiHandler } from 'next'
import prisma from '@/libs/prisma'
import dayjs from 'dayjs'
import { withApiAuthRequired } from '@auth0/nextjs-auth0'

const handler: NextApiHandler = async (req, res) => {
  try {
    console.log(req.body)
    if (req.method === 'PUT') {
      const game = await prisma.game.create({
        data: {
          playedAt: dayjs().toISOString(),
          rule: req.body.gameRule,
          rate: req.body.gameRate,
        },
      })
      res.json({
        ok: true,
        game,
      })
      return
    } else {
      res.status(404).json({ ok: false, error: 'Invalid Request Method' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ ok: false, error })
  }
}
export default withApiAuthRequired(handler)
