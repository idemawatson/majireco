import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import * as React from 'react'
import Player from '@/types/Player'

type Props = {
  players: Player[]
  handleOnSelectPlayer: (player: Player) => void
  disabled: boolean
}

export default function Presenter({ players, handleOnSelectPlayer, disabled }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const selections = players.map((player) => (
    <MenuItem key={player.name} onClick={() => handleOnSelectPlayer(player)}>
      {player.name}
    </MenuItem>
  ))

  return (
    <div>
      <Button
        disabled={disabled}
        id='demo-positioned-button'
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        プレイヤーを追加する
      </Button>
      <Menu
        id='demo-positioned-menu'
        aria-labelledby='demo-positioned-button'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {selections}
      </Menu>
    </div>
  )
}
