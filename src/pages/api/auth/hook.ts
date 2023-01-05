import type { NextApiRequest, NextApiResponse } from 'next'
import { CreatePlayerController } from '@/controllers/CreatePlayerController'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { playerId, name, secret } = req.body

  if (req.method !== 'PUT') {
    return res.status(403).json({ message: 'Method not allowed' })
  }
  if (secret !== process.env.AUTH0_HOOK_SECRET) {
    return res.status(403).json({ message: `You must provide the secret.` })
  }
  const controller = new CreatePlayerController()
  await controller.createPlayer({ playerId, name })

  return res.status(200).json({
    message: `User with email: ${playerId} has been created successfully!`,
  })
}

export default handler
