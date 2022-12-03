import { GAME_RULES, GAME_RULES_TYPE } from '@/libs/const'

const RANKING_POINTS = {
  [GAME_RULES[0]]: { 1: 20, 2: 10, 3: -10, 4: -20 },
  [GAME_RULES[1]]: { 1: 30, 2: 10, 3: -10, 4: -30 },
}

export default (scores: number[], rule: GAME_RULES_TYPE) => {
  const [rank1, rank2, rank3, rank4] = scores.sort((a, b) => b - a)
  const calcScore = (score: number, rankingPoint: number) =>
    Math.round((score - 30100) / 1000) + rankingPoint
  const score4 = rank4 >= 0 ? calcScore(rank4, RANKING_POINTS[rule][4]) : -60
  const score3 = rank3 >= 0 ? calcScore(rank3, RANKING_POINTS[rule][3]) : -60
  const score2 = rank2 >= 0 ? calcScore(rank2, RANKING_POINTS[rule][2]) : -60
  let score1 = Math.abs(score4 + score3 + score2)
  if (rank4 < 0) score1 -= 10
  if (rank3 < 0) score1 -= 10
  if (rank2 < 0) score1 -= 10
  return { score1, score2, score3, score4 }
}
