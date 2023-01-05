import { useUser } from '@auth0/nextjs-auth0'
import { Card, CardContent, CardHeader, Grid, Paper, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { BaseButton } from '@/components/uiParts/BaseButton'
import { useGame } from '@/hooks/useGame'
import { getRateText } from '@/libs/gameRate'
import { getRuleText } from '@/libs/gameRule'

type Props = {
  joinGame: () => {}
}

const Presenter: FC<Props> = ({ joinGame }) => {
  const router = useRouter()
  const { user } = useUser()
  const { data } = useGame(router.query.gameId as string)
  const ruleText = data ? getRuleText(data.rule) : ''
  const rateText = data ? getRateText(data.rate) : ''
  const playedAtText = dayjs(data?.playedAt).format('YYYY/MM/DD HH:mm:ss')

  const isAlreadyJoined = data?.belongingPlayers.some((player) => player.playerId === user?.sub)
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
      {!isAlreadyJoined ? (
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
                    対局に参加する
                  </BaseButton>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Paper>
      ) : (
        <Paper
          sx={{
            margin: 2,
            padding: 2,
            textAlign: 'center',
          }}
          elevation={0}
        >
          <Typography variant='body1'>既に参加済みの対局URLです</Typography>
        </Paper>
      )}
    </>
  )
}

export default Presenter
