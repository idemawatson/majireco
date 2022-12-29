import BaseDisplayCard from '@/components/uiParts/BaseDisplayCard'
import { useAnalyzedRecords } from '@/hooks/useAnalyzedRecords'
import { Grid, Typography } from '@mui/material'
import { FC } from 'react'

type Props = {
  rate: string
}

const AnalyticsCards: FC<Props> = ({ rate }) => {
  const { data } = useAnalyzedRecords(rate)
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
            {`${data?.avgScore}位`}
          </Typography>
          <Typography variant='subtitle1'>平均得点</Typography>
        </BaseDisplayCard>
      </Grid>
    </Grid>
  )
}

export default AnalyticsCards
