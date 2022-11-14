import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Paper,
  styled,
  Typography,
} from '@mui/material'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { useGetGame } from '@/hooks/useGetGame'
import { GAME_RATE_SELECTIONS, GAME_RULE_SELECTIONS } from '@/libs/const'
import dayjs from 'dayjs'

const Presenter: FC = () => {
  const router = useRouter()
  const { data } = useGetGame(router.query.gameId as string)
  const joinGame = () => {
    console.log('joined!')
  }
  const ruleText = GAME_RULE_SELECTIONS.find((rule) => data?.rule === rule.value)?.text
  const rateText = GAME_RATE_SELECTIONS.find((rate) => data?.rate === rate.value)?.text
  const playedAtText = dayjs(data?.playedAt).format('YYYY/MM/DD HH:mm:ss')

  const Caption = ({ title, value }: { title: string; value: string | undefined }) => (
    <Typography variant='body1' sx={{ my: 1 }}>
      <Typography component='span' sx={{ fontWeight: 'bold' }}>
        {title}
      </Typography>
      : {value}
    </Typography>
  )

  return (
    <>
      <Paper
        sx={{
          margin: 2,
        }}
        elevation={0}
      >
        <Card elevation={0}>
          <CardHeader title='対局' />
          <CardContent>
            <Grid container justifyContent='flex-end'>
              <Grid item xs={12}>
                <Caption title='作成者' value={data?.owner.name} />
                <Caption title='作成日時' value={playedAtText} />
                <Caption title='ルール' value={ruleText} />
                <Caption title='レート' value={rateText} />
              </Grid>
              <Grid xs={12} sx={{ mt: 2, textAlign: 'right' }} item>
                <Button
                  variant='contained'
                  disableElevation
                  color='secondary'
                  type='submit'
                  onClick={joinGame}
                >
                  ゲームに参加する
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Paper>
    </>
  )
}

export default Presenter
