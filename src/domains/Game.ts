import {
  Game as PrismaGame,
  GameRate,
  GameRule,
  Player,
  PlayerOnGame as PrismaPlayerOnGame,
} from '@prisma/client'

export type PlayerOnGame = PrismaPlayerOnGame & {
  player: Player
}

export type GameType = PrismaGame & {
  belongingPlayers?: PlayerOnGame[]
}

export class Game implements GameType {
  id: string
  playedAt: Date
  rule: GameRule
  rate: GameRate
  started: boolean
  belongingPlayers?: PlayerOnGame[]

  constructor(props: GameType) {
    this.id = props.id
    this.playedAt = props.playedAt
    this.rule = props.rule
    this.rate = props.rate
    this.started = props.started
    this.belongingPlayers = props.belongingPlayers || undefined
    Object.freeze(this)
  }
}
