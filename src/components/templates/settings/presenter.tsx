import { Box, Grid, Paper } from '@mui/material'
import { FC } from 'react'
import { SelectField } from '@/components/uiParts/SelectField/presenter'
import { useTheme } from '@/hooks/useTheme'
import { PLAYER_THEME } from '@/libs/const'

const SettingsPresenter: FC = () => {
  const { theme, setTheme } = useTheme()
  const themeSelections = [
    { text: 'ABEMAS', value: PLAYER_THEME.T1 },
    { text: 'Pirates', value: PLAYER_THEME.T2 },
    { text: 'サクラナイツ', value: PLAYER_THEME.T3 },
    { text: 'ドリブンズ', value: PLAYER_THEME.T4 },
    { text: '麻雀格闘倶楽部', value: PLAYER_THEME.T5 },
    { text: 'フェニックス', value: PLAYER_THEME.T6 },
    { text: '風林火山', value: PLAYER_THEME.T7 },
    { text: '雷電', value: PLAYER_THEME.T8 },
  ]
  return (
    <>
      <Box sx={{ mx: 2, mb: 10, mt: 2 }}>
        <Grid container>
          <Grid xs={6} item>
            <Paper sx={{ mt: 2 }} elevation={0}>
              <SelectField
                label='テーマカラー'
                name='theme'
                selectPropsList={themeSelections}
                selectedValue={theme}
                onChange={(event) => setTheme(event.target.value as string)}
              />
            </Paper>
          </Grid>
        </Grid>
        <Grid container>
          <Grid xs={12} item>
            <Paper
              sx={{
                backgroundColor: 'primary.main',
                height: '50px',
                width: '100%',
                py: 2,
                my: 2,
                textAlign: 'center',
                position: 'relative',
              }}
              elevation={0}
            >
              <Paper
                sx={{
                  backgroundColor: 'secondary.main',
                  height: '100%',
                  width: '10%',
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                }}
                elevation={0}
              ></Paper>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default SettingsPresenter
