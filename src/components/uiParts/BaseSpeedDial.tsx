import { Edit } from '@mui/icons-material'
import { Backdrop, SpeedDial, SpeedDialAction } from '@mui/material'
import { FC, ReactNode } from 'react'

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
  actions: { icon: ReactNode; name: string; onClick: () => void }[]
}

const BaseSpeedDial: FC<Props> = ({ open, setOpen, actions }) => {
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  return (
    <>
      <Backdrop open={open} />
      <SpeedDial
        ariaLabel='SpeedDial tooltip example'
        sx={{
          margin: 0,
          top: 'auto',
          right: 20,
          bottom: 80,
          left: 'auto',
          position: 'fixed',
          zIndex: 900,
        }}
        icon={<Edit />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={action.onClick}
          />
        ))}
      </SpeedDial>
    </>
  )
}

export default BaseSpeedDial
