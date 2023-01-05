import { GAME_RULES, GAME_RULES_TYPE } from '@/libs/const'

const RANKING_POINTS = {
  [GAME_RULES[0]]: { 1: 20, 2: 10, 3: -10, 4: -20 },
  [GAME_RULES[1]]: { 1: 30, 2: 10, 3: -10, 4: -30 },
}

const calcRecordScores = (
  players: { playerId: string; point: number }[],
  rule: GAME_RULES_TYPE,
) => {
  const ranks = [...players].sort((a, b) => b.point - a.point)
  const calcScore = (point: number, rankingPoint: number) =>
    point >= 0 ? Math.round((point - 301) / 10) + rankingPoint : -60
  const score4 = calcScore(ranks[3].point, RANKING_POINTS[rule][4])
  const score3 = calcScore(ranks[2].point, RANKING_POINTS[rule][3])
  const score2 = calcScore(ranks[1].point, RANKING_POINTS[rule][2])
  let score1 = Math.abs(score4 + score3 + score2)
  for (const score of [score4, score3, score3]) {
    if (score === -60) score1 -= 10
  }
  return players.map((player) => {
    const rank = ranks.findIndex((rank) => rank.playerId === player.playerId)
    return [score1, score2, score3, score4][rank]
  })
}

export default calcRecordScores
