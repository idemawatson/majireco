import BaseDisplayCard from '@/components/uiParts/BaseDisplayCard'
import { Grid, Skeleton, Typography } from '@mui/material'
import { FC } from 'react'

const AnalyticsLoadingCards: FC = () => {
  return (
    <Grid container>
      <Grid xs={12} item sx={{ px: 1, pt: 2 }}>
        <BaseDisplayCard>
          <Typography variant='h3' sx={{ fontWeight: '500' }}>
            <Skeleton variant='text' sx={{ mx: 4 }}></Skeleton>
          </Typography>
          <Typography variant='subtitle1'>平均着順</Typography>
        </BaseDisplayCard>
      </Grid>
      <Grid xs={12} item sx={{ px: 1, pt: 2 }}>
        <BaseDisplayCard>
          <Typography variant='h3' sx={{ fontWeight: '500' }}>
            <Skeleton variant='text' sx={{ mx: 4 }}></Skeleton>
          </Typography>
          <Typography variant='subtitle1'>平均得点</Typography>
        </BaseDisplayCard>
      </Grid>
      <Grid xs={12} item sx={{ px: 1, pt: 2 }}>
        <BaseDisplayCard>
          <Typography variant='h3' sx={{ fontWeight: '500' }}>
            <Skeleton variant='text' sx={{ mx: 4 }}></Skeleton>
          </Typography>
          <Typography variant='subtitle1'>レート換算</Typography>
        </BaseDisplayCard>
      </Grid>
    </Grid>
  )
}

export default AnalyticsLoadingCards
