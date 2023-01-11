import { useRouter } from 'next/router'
import { FC } from 'react'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { useGame } from '@/hooks/useGame'
import sliceText from '@/libs/sliceText'

const LINE_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

const RecordTransitionChart: FC = () => {
  const router = useRouter()
  const { data } = useGame(router.query.gameId as string)

  if (!data) return <></>
  const playerInfo = data.belongingPlayers.reduce((playerInfo, player) => {
    playerInfo[player.playerId] = { name: player.playerName, score: 0 }
    return playerInfo
  }, {} as { [playerId: string]: { name: string; score: number } })

  const records = Object.values(data.roundRecords).map((record) => {
    return record.reduce((previous, { playerId, score }) => {
      playerInfo[playerId].score += score
      previous[playerId] = playerInfo[playerId].score
      return previous
    }, {} as { [playerId: string]: number })
  })

  records.unshift(
    Object.keys(playerInfo).reduce((previous, playerId) => {
      previous[playerId] = 0
      return previous
    }, {} as { [playerId: string]: number }),
  )

  const renderLines = () => {
    return data.belongingPlayers.map((player, index) => (
      <Line
        type='monotone'
        key={player.playerId}
        dataKey={player.playerId}
        stroke={LINE_COLORS[index]}
      />
    ))
  }

  return (
    <ResponsiveContainer width='100%' height={400}>
      <LineChart data={records}>
        <Legend
          verticalAlign='bottom'
          formatter={(value) => <div>{sliceText(playerInfo[value].name, 5)}</div>}
        />
        <CartesianGrid strokeDasharray='3 3' />
        <YAxis />
        <XAxis></XAxis>
        {renderLines()}
      </LineChart>
    </ResponsiveContainer>
  )
}

export default RecordTransitionChart
