import AnalyticsCards from '@/components/organisms/analytics/AnalyticsCards'
import AnalyticsLoadingCards from '@/components/organisms/analytics/AnalyticsLoadingCards'
import { SelectField } from '@/components/uiParts/SelectField/presenter'
import { GAME_RATE_SELECTIONS } from '@/libs/const'
import { Box, Grid, Paper } from '@mui/material'
import { FC, Suspense, useState } from 'react'

const Presenter: FC = () => {
  const [rate, setRate] = useState(GAME_RATE_SELECTIONS[2].value)
  return (
    <>
      <Box sx={{ mx: 2, mb: 10, mt: 2 }}>
        <Grid container>
          <Grid xs={6} item>
            <Paper sx={{ mt: 2 }} elevation={0}>
              <SelectField
                label='レート'
                name='rate'
                selectPropsList={GAME_RATE_SELECTIONS}
                selectedValue={rate}
                onChange={(event) => setRate(event.target.value as string)}
              />
            </Paper>
          </Grid>
        </Grid>
        <Suspense fallback={<AnalyticsLoadingCards />}>
          <AnalyticsCards rate={rate}></AnalyticsCards>
        </Suspense>
      </Box>
    </>
  )
}

export default Presenter
