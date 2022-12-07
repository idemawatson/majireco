import { Button, Card, CardContent, CardHeader, Grid, Paper, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { useGame } from '@/hooks/useGame'
import gameRule from '@/libs/gameRule'
import gameRate from '@/libs/gameRate'
import dayjs from 'dayjs'
import { BaseButton } from '@/components/uiParts/BaseButton'

type Props = {
  joinGame: () => {}
}

const Presenter: FC<Props> = ({ joinGame }) => {
  const router = useRouter()
  const { data } = useGame(router.query.gameId as string)
  const ruleText = data ? gameRule.getRuleText(data.rule) : ''
  const rateText = data ? gameRate.getRateText(data.rate) : ''
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
                <BaseButton color='secondary' onClick={joinGame}>
                  ゲームに参加する
                </BaseButton>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Paper>
    </>
  )
}

export default Presenter
