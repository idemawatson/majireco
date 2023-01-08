import { Box, Grid } from '@mui/material'
import { FC, Suspense } from 'react'
import PlayerInfoFormCard from '@/components/organisms/settings/PlayerInfoFormCard'
import PlayerInfoLoader from '@/components/organisms/settings/PlayerInfoLoader'
import ThemeSelectorCard from '@/components/organisms/settings/ThemeSelectorCard'

const SettingsPresenter: FC = () => {
  return (
    <>
      <Box sx={{ mx: 2, mb: 10, mt: 2 }}>
        <Grid container>
          <Grid xs={12} sx={{ my: 1 }} item>
            <ThemeSelectorCard />
          </Grid>
          <Grid xs={12} sx={{ my: 1 }} item>
            <Suspense fallback={<PlayerInfoLoader />}>
              <PlayerInfoFormCard />
            </Suspense>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default SettingsPresenter
