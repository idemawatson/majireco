// import Presenter from '@/pages/home/presenter'
// import { useUserInfoSwr } from '@/pages/home/hooks'
import { MainLayout } from '@/components/layout/MainLayout'
import { withPageAuthRequired, WithPageAuthRequiredProps } from '@auth0/nextjs-auth0'
import { FC } from 'react'
import {
  Grid,
  Card,
  Paper,
  CardHeader,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Button,
  IconButton,
} from '@mui/material'
import { PlusOne } from '@mui/icons-material'

const Page: FC = () => {
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
              <ListItem>
                <ListItemText>プレイヤー1</ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>プレイヤー2</ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>プレイヤー3</ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>プレイヤー4</ListItemText>
              </ListItem>
            </List>
            <Grid container justifyContent='flex-end'>
              <IconButton>
                プレイヤーを追加する
                <PlusOne></PlusOne>
              </IconButton>
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

const AuthPage: FC<WithPageAuthRequiredProps> & { layout?: typeof MainLayout } =
  withPageAuthRequired(Page)
AuthPage.layout = MainLayout

export default AuthPage
