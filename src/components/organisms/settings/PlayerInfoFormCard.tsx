import { yupResolver } from '@hookform/resolvers/yup'
import { Card, CardActions, CardContent, CardHeader, Grid } from '@mui/material'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { BaseButton } from '@/components/uiParts/BaseButton'
import { RhfTextField } from '@/components/uiParts/TextField'
import { useLoading } from '@/components/uiParts/TheLoading/hooks'
import { useNotification } from '@/components/uiParts/TheNotificationToast/hooks'
import { usePlayer } from '@/hooks/usePlayer'
import restClient from '@/libs/restClient'
import { IUpdatePlayerForm, schema } from '@/types/forms/PlayerUpdateForm'
import {
  UpdatePlayerRequestDTO,
  UpdatePlayerResponseDTO,
} from '@/usecases/UpdatePlayer/UpdatePlayerDto'

const PlayerInfoFormCard: FC = () => {
  const { data, mutate } = usePlayer()
  const formMethods = useForm<IUpdatePlayerForm>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: { name: data?.name },
  })

  const { showLoading, hideLoading } = useLoading()
  const { showSuccess, showError } = useNotification()
  const submitForm = async (data: IUpdatePlayerForm) => {
    try {
      showLoading()
      const player = await restClient.post<UpdatePlayerRequestDTO, UpdatePlayerResponseDTO>(
        '/player',
        { name: data.name },
      )
      mutate(player.data)
      showSuccess('更新しました')
    } catch (err: any) {
      showError('更新に失敗しました')
    } finally {
      hideLoading()
    }
  }

  return (
    <>
      <form onSubmit={formMethods.handleSubmit(submitForm)}>
        <Card elevation={0}>
          <CardHeader title='プレイヤー設定'></CardHeader>
          <CardContent>
            <RhfTextField
              label='プレイヤー名'
              name='name'
              control={formMethods.control}
            ></RhfTextField>
          </CardContent>
          <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <BaseButton color='secondary' submit>
              保存
            </BaseButton>
          </CardActions>
        </Card>
      </form>
    </>
  )
}

export default PlayerInfoFormCard
