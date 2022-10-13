import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
} from '@mui/material'
import { FC } from 'react'
import Player from '@/types/Player'
import PlayerSelectMenu from '@/components/uiParts/PlayerSelectMenu'
import { usePlayers } from './hooks'

type Props = {
  allPlayers: Player[]
}

const Presenter: FC<Props> = ({ allPlayers }) => {
  const { players, addPlayer } = usePlayers()
  const selectedPlayers = players.map((player) => (
    <ListItem key={player.name}>
      <ListItemText>{player.name}</ListItemText>
    </ListItem>
  ))

  return (
    <>
      <Paper
        sx={{
          margin: 2,
        }}
        elevation={0}
      >
        <Card spacing={2} elevation={0}>
          <CardHeader title='対局を作成する' />
          <CardContent>
            <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
              {selectedPlayers}
            </List>
            <Grid container justifyContent='flex-end'>
              <PlayerSelectMenu
                players={allPlayers}
                disabled={players.length == 4}
                handleOnSelectPlayer={addPlayer}
              />
            </Grid>
            <Grid container justifyContent='flex-end'>
              <Button variant='contained' disableElevation color='primary'>
                対局を開始する
              </Button>
            </Grid>
          </CardContent>
        </Card>
      </Paper>
    </>
  )
}

export default Presenter
