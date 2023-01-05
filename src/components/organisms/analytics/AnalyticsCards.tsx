import { Grid, Typography } from '@mui/material'
import { FC } from 'react'
import BaseDisplayCard from '@/components/uiParts/BaseDisplayCard'
import { useAnalyzedRecords } from '@/hooks/useAnalyzedRecords'

type Props = {
  rate: string
}

const AnalyticsCards: FC<Props> = ({ rate }) => {
  const { data } = useAnalyzedRecords(rate)
  const displayNumber = (num: number | undefined) => (num && num >= 0 ? `+${num}` : `${num}`)
  return (
    <Grid container>
      <Grid xs={12} item sx={{ px: 1, pt: 2 }}>
        <BaseDisplayCard>
          <Typography variant='h3' sx={{ fontWeight: '500' }}>
            {`${data?.avgRank}位`}
          </Typography>
          <Typography variant='subtitle1'>平均着順</Typography>
        </BaseDisplayCard>
      </Grid>
      <Grid xs={12} item sx={{ px: 1, pt: 2 }}>
        <BaseDisplayCard>
          <Typography variant='h3' sx={{ fontWeight: '500' }}>
            {displayNumber(data?.avgScore)}
          </Typography>
          <Typography variant='subtitle1'>平均得点</Typography>
        </BaseDisplayCard>
      </Grid>
      <Grid xs={12} item sx={{ px: 1, pt: 2 }}>
        <BaseDisplayCard>
          <Typography variant='h3' sx={{ fontWeight: '500' }}>
            {`${displayNumber((data?.totalCost || 0) / 1000)}k`}
          </Typography>
          <Typography variant='subtitle1'>レート換算</Typography>
        </BaseDisplayCard>
      </Grid>
      <Grid xs={12} item sx={{ px: 1, pt: 2, textAlign: 'end' }}>
        <Typography sx={{ fontSize: '20px' }}>{`総半荘数: ${data?.roundNum}`}</Typography>
      </Grid>
    </Grid>
  )
}

export default AnalyticsCards
