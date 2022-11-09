import type { NextApiHandler } from 'next'
import { withApiAuthRequired } from '@auth0/nextjs-auth0'
import CreateGameUseCase from '@/usecase/CreateGameUseCase'
import GetGameUseCase from '@/usecase/GetGameUseCase'

const handler: NextApiHandler = async (req, res) => {
  try {
    console.log(req.body)
    if (req.method === 'PUT') {
      const createGameUseCase = new CreateGameUseCase()
      const game = await createGameUseCase.exec(req.body)
      res.json(game)
      return
    } else if (req.method === 'GET') {
      if (req.query.game_id == null || Array.isArray(req.query.game_id)) {
        res.status(500).json({ ok: false, error: 'Invalid Query Parameter' })
        return
      }
      const getGameUseCase = new GetGameUseCase()
      const game = await getGameUseCase.exec({ gameId: req.query.game_id })
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
