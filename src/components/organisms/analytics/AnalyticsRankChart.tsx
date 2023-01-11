import { Card, CardContent, CardHeader, Grid } from '@mui/material'
import { FC } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts'
import { PieLabelRenderProps } from 'recharts/types'
import { useAggregatedRecords } from '@/hooks/useAggregatedRecords'

type Props = {
  rate: string
}
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

const AnalyticsRankChart: FC<Props> = ({ rate }) => {
  const { data } = useAggregatedRecords(rate)
  if (!data) return <></>
  const rankData = data?.ranks.map((rank, index) => {
    return { name: `${index + 1}位`, value: rank * 100 }
  })

  const RADIAN = Math.PI / 180
  const renderCustomizedLabel = (props: PieLabelRenderProps) => {
    const innerRadius = props.innerRadius as number
    const outerRadius = props.outerRadius as number
    const cx = props.cx as number
    const cy = props.cy as number
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = (cx as number) + radius * Math.cos(-props.midAngle * RADIAN)
    const y = (cy as number) + radius * Math.sin(-props.midAngle * RADIAN)

    return (
      <text
        x={x}
        y={y}
        fill='white'
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline='central'
        fontSize={'20px'}
      >
        {`${((props.percent as number) * 100).toFixed(1)}%`}
      </text>
    )
  }
  return (
    <Grid xs={12} item sx={{ px: 1, pt: 2 }}>
      <Card elevation={0}>
        <CardHeader title='着順分布'></CardHeader>
        <CardContent sx={{ margin: 'auto' }}>
          <ResponsiveContainer width='100%' height={400}>
            <PieChart>
              <Pie
                data={rankData}
                dataKey='value'
                nameKey='name'
                cx='50%'
                cy='50%'
                label={renderCustomizedLabel}
                labelLine={false}
                outerRadius={150}
                startAngle={90}
                endAngle={-270}
              >
                {rankData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend verticalAlign='top'></Legend>
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </Grid>
  )
}
export default AnalyticsRankChart
