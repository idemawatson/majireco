import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Grid, SwipeableDrawer, Typography } from '@mui/material'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { BaseButton } from '@/components/uiParts/BaseButton'
import { useGame } from '@/hooks/useGame'
import { useRouter } from 'next/router'
import { IGameMemoForm, schema } from '@/types/forms/GameMemoForm'
import { RhfTextArea } from '@/components/uiParts/TextArea'

type Props = {
  submitForm: (form: IGameMemoForm) => void
  drawer: boolean
  setDrawer: (drawer: boolean) => void
}
const RecordMemoFormDrawer: FC<Props> = ({ submitForm, drawer, setDrawer }) => {
  const router = useRouter()
  const { data } = useGame(router.query.gameId as string)

  if (!data) return <></>

  const defaultValues = { memo: data.memo }

  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm<IGameMemoForm>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues,
  })
  const _handleSubmit = (form: IGameMemoForm) => {
    submitForm(form)
    setDrawer(false)
  }

  return (
    <>
      <SwipeableDrawer
        anchor='bottom'
        open={drawer}
        onOpen={() => setDrawer(true)}
        onClose={() => setDrawer(false)}
      >
        <Box sx={{ my: 2, mx: 2 }}>
          <Typography variant='subtitle1'>対局メモ</Typography>
          <form onSubmit={handleSubmit(_handleSubmit)}>
            <Grid container>
              <Grid xs={12} sx={{ my: 1 }} alignSelf='center' item>
                <RhfTextArea
                  name='memo'
                  minRows={6}
                  placeholder='３半荘目に天和出現！'
                  control={control}
                />
              </Grid>
            </Grid>
            <Grid container sx={{ mt: 2 }}>
              <Grid xs={12} item sx={{ textAlign: 'right' }}>
                <BaseButton submit={true} color='secondary' disabled={!isValid}>
                  更新
                </BaseButton>
              </Grid>
            </Grid>
          </form>
        </Box>
      </SwipeableDrawer>
    </>
  )
}

export default RecordMemoFormDrawer
