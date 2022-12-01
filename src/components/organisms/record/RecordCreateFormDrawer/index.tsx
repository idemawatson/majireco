import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Fab,
  Grid,
  Paper,
  styled,
  SwipeableDrawer,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { FC, useState } from 'react'
import { ICreateRecordForm, schema } from '@/types/forms/CreateRecordForm'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { RhfTextField } from '@/components/uiParts/TextField'

const FixedFab = styled(Fab)(() => ({
  margin: 0,
  top: 'auto',
  right: 20,
  bottom: 80,
  left: 'auto',
  position: 'fixed',
}))

const RecordCreateFormDrawer: FC = () => {
  const formMethods = useForm<ICreateRecordForm>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      player1_score: 25000,
      player2_score: 25000,
      player3_score: 25000,
      player4_score: 25000,
    },
  })
  const [drawer, setDrawer] = useState(false)
  const openDrawer = () => {
    setDrawer(true)
  }
  const closeDrawer = () => {
    setDrawer(false)
  }
  return (
    <>
      <FixedFab color='primary' aria-label='add' onClick={openDrawer}>
        <AddIcon />
      </FixedFab>
      <SwipeableDrawer anchor='bottom' open={drawer} onOpen={openDrawer} onClose={closeDrawer}>
        <Card elevation={0}>
          <CardHeader title='半荘データ作成' />
          <CardContent>
            <Grid item xs={12}>
              <form onSubmit={formMethods.handleSubmit((form) => console.log(form))}>
                <Grid container>
                  <Grid xs={12} sx={{ my: 2 }} item>
                    <RhfTextField
                      label='プレイヤー1'
                      name='player1_score'
                      control={formMethods.control}
                    />
                  </Grid>
                  <Grid xs={12} sx={{ my: 2 }} item>
                    <RhfTextField
                      label='プレイヤー2'
                      name='player2_score'
                      control={formMethods.control}
                    />
                  </Grid>
                  <Grid xs={12} sx={{ my: 2 }} item>
                    <RhfTextField
                      label='プレイヤー3'
                      name='player3_score'
                      control={formMethods.control}
                    />
                  </Grid>
                  <Grid xs={12} sx={{ my: 2 }} item>
                    <RhfTextField
                      label='プレイヤー4'
                      name='player4_score'
                      control={formMethods.control}
                    />
                  </Grid>
                </Grid>
                <Grid xs={12} sx={{ my: 2, textAlign: 'right' }} item>
                  <Button variant='contained' disableElevation color='secondary' type='submit'>
                    保存
                  </Button>
                </Grid>
              </form>
            </Grid>
          </CardContent>
        </Card>
      </SwipeableDrawer>
    </>
  )
}

export default RecordCreateFormDrawer
