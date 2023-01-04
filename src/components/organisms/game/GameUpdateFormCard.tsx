import { yupResolver } from '@hookform/resolvers/yup'
import {
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
  Card,
  CardHeader,
  CardContent,
  CardActions,
} from '@mui/material'
import ReplayIcon from '@mui/icons-material/Replay'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { RhfSelectField } from '@/components/uiParts/SelectField'
import { GAME_RATE_SELECTIONS, GAME_RULE_SELECTIONS } from '@/libs/const'

import { GetGameResponseDTO } from '@/usecases/GetGame/GetGameDto'
import { IUpdateGameForm, schema } from '@/types/forms/GameUpdateForm'
import { ShareOutlined } from '@mui/icons-material'
import { useNotification } from '@/components/uiParts/TheNotificationToast/hooks'
import { useUser } from '@auth0/nextjs-auth0'

type Props = {
  submitForm: (data: IUpdateGameForm) => void
  refresh: () => void
  game: GetGameResponseDTO
}

const GameUpdateFormCard: FC<Props> = ({ submitForm, refresh, game }) => {
  const { showInfo } = useNotification()
  const { user } = useUser()
  const playerList = Array.from(Array(4).keys()).map((i) => {
    const pg =
      game?.belongingPlayers && game?.belongingPlayers[i] ? game?.belongingPlayers[i] : null
    return (
      <ListItem sx={{ py: 0 }} key={i}>
        <ListItemText primary={`${i + 1}. ${pg ? pg.playerName : '未参加'}`}></ListItemText>
      </ListItem>
    )
  })

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${window.location.host}/game/join/${game.id}`).then(
      () => {
        showInfo('対局URLをコピーしました。参加者に共有してください。')
      },
      (err) => {
        console.error('Async: Could not copy text: ', err)
      },
    )
  }

  const formMethods = useForm<IUpdateGameForm>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: { rule: game?.rule, rate: game?.rate },
  })

  const isOwner = game?.owner.id === user?.sub
  const isEnoughMember = game?.belongingPlayers?.length === 4

  return (
    <Card elevation={0}>
      <CardHeader
        title='対局'
        action={
          <Grid container>
            {isOwner && (
              <Button
                variant='contained'
                disableElevation
                onClick={copyToClipboard}
                color='secondary'
                sx={{ mx: 1 }}
              >
                <ShareOutlined />
              </Button>
            )}
            <Button variant='contained' disableElevation onClick={refresh} color='secondary'>
              <ReplayIcon sx={{ color: 'white' }} />
            </Button>
          </Grid>
        }
      />
      <CardContent>
        <Grid container justifyContent='flex-end'>
          <Grid item xs={12}>
            <form onSubmit={formMethods.handleSubmit(submitForm)}>
              <Grid container>
                <Grid xs={12} sx={{ my: 2 }} item>
                  <RhfSelectField
                    label='配点ルール'
                    name='rule'
                    readOnly={!isOwner}
                    control={formMethods.control}
                    selectPropsList={GAME_RULE_SELECTIONS}
                  />
                </Grid>
                <Grid xs={12} sx={{ my: 2 }} item>
                  <RhfSelectField
                    label='レート'
                    name='rate'
                    readOnly={!isOwner}
                    control={formMethods.control}
                    selectPropsList={GAME_RATE_SELECTIONS}
                  />
                </Grid>
                <Grid xs={12} sx={{ my: 2 }} item>
                  <Typography variant='subtitle1' color='initial'>
                    参加プレイヤー
                  </Typography>
                  {isEnoughMember ? (
                    <></>
                  ) : (
                    <Typography variant='caption' color='error' fontSize={'14px'}>
                      メンバーが不足しています
                    </Typography>
                  )}
                  <List>{playerList}</List>
                </Grid>
                <Grid xs={12} sx={{ my: 2, textAlign: 'right' }} item>
                  {isOwner && (
                    <Button
                      variant='contained'
                      disableElevation
                      color='secondary'
                      type='submit'
                      disabled={!isEnoughMember}
                    >
                      対局を開始する
                    </Button>
                  )}
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default GameUpdateFormCard
