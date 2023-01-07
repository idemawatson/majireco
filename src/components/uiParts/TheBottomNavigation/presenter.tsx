import { AnalyticsOutlined, FormatListBulletedOutlined, Settings } from '@mui/icons-material'
import { Paper } from '@mui/material'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import { useEffect, useState, FC } from 'react'

type Props = {
  value: string
  handleChange: (event: React.SyntheticEvent, newValue: string) => void
}
const LabelBottomNavigation: FC<Props> = ({ value, handleChange }) => {
  const [routeName, setRouteName] = useState('/games')
  useEffect(() => {
    setRouteName(value.split('/')[1])
  }, [value])
  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
      <BottomNavigation sx={{ width: '100%' }} value={routeName} onChange={handleChange}>
        <BottomNavigationAction
          label='対局一覧'
          value='games'
          icon={<FormatListBulletedOutlined />}
        />
        <BottomNavigationAction label='統計' value='analytics' icon={<AnalyticsOutlined />} />
        <BottomNavigationAction label='設定' value='settings' icon={<Settings />} />
      </BottomNavigation>
    </Paper>
  )
}

export default LabelBottomNavigation
