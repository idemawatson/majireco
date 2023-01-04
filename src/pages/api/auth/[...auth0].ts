import { handleAuth, handleCallback, handleLogout, Session } from '@auth0/nextjs-auth0'
import jwt from 'jsonwebtoken'
import type { NextApiRequest, NextApiResponse } from 'next'

const afterCallback = async (_1: NextApiRequest, _2: NextApiResponse, session: Session) => {
  const payload = {
    userId: session.user.sub,
    exp: Math.floor(Date.now() / 1000) + 60 * 60,
  }
  if (process.env.SUPABASE_SIGNING_SECRET) {
    session.user.accessToken = jwt.sign(payload, process.env.SUPABASE_SIGNING_SECRET)
  }

  return session
}

export default handleAuth({
  async callback(req, res) {
    try {
      await handleCallback(req, res, { afterCallback })
    } catch (error) {
      console.error(error)
      res.status(500).end('エラーが発生しました')
    }
  },
  logout: async (req, res) => {
    try {
      await handleLogout(req, res, {
        returnTo: '/games',
      })
    } catch (error) {
      console.error(error)
      res.status(500).end('エラーが発生しました')
    }
  },
})
