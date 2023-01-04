import { Card, CardActions, CardContent, Grid, Paper, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { FC } from 'react'
import GameUpdateFormCard from '@/components/organisms/game/GameUpdateFormCard'
import { useGame } from '@/hooks/useGame'
import { IUpdateGameForm } from '@/types/forms/GameUpdateForm'
import { useLoading } from '@/components/uiParts/TheLoading/hooks'
import restClient from '@/libs/restClient'
import { UpdateGameResponseDto } from '@/usecases/UpdateGame/UpdateGameDto'
import { useNotification } from '@/components/uiParts/TheNotificationToast/hooks'
import { BaseButton } from '@/components/uiParts/BaseButton'
import { DeleteForever } from '@mui/icons-material'

type Props = {}

const Presenter: FC<Props> = () => {
  const router = useRouter()
  const { showLoading, hideLoading } = useLoading()
  const { showSuccess, showError } = useNotification()
  const { data, mutate } = useGame(router.query.gameId as string)

  const submitForm = async (form: IUpdateGameForm) => {
    if (!data) return
    try {
      showLoading()
      await restClient.post<
        IUpdateGameForm & { gameId: string; started: boolean },
        UpdateGameResponseDto
      >('/game', {
        ...form,
        gameId: router.query.gameId as string,
        started: true,
      })
      mutate({ ...data, started: true }, false)
    } catch (e) {
      showError('対局を開始できませんでした')
    } finally {
      hideLoading()
    }
  }

  const deleteGame = async () => {
    if (!data) return
    try {
      showLoading()
      await restClient.delete(`/game?game_id=${data.id}`)
      router.push('/games')
      showSuccess('対局を削除しました')
    } catch (e) {
      showError('対局を削除できませんでした')
    } finally {
      hideLoading()
    }
  }

  const toRecordPage = () => {
    router.push(`/record/${data?.id}`)
  }

  const isStarted = data?.started

  return (
    <>
      <Paper
        sx={{
          my: 2,
          mx: 1,
        }}
        elevation={0}
      >
        {!isStarted ? (
          data && (
            <GameUpdateFormCard
              game={data}
              submitForm={submitForm}
              refresh={mutate}
              deleteGame={deleteGame}
            />
          )
        ) : (
          <>
            <Card elevation={0}>
              <CardContent>
                <Typography variant='body1'>開始済みの対局です。</Typography>
              </CardContent>
              <CardActions>
                <BaseButton color='secondary' onClick={toRecordPage}>
                  対局データを見る
                </BaseButton>
              </CardActions>
            </Card>
          </>
        )}
      </Paper>
    </>
  )
}

export default Presenter
