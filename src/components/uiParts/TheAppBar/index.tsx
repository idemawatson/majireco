import Presenter from '@/components/uiParts/TheAppBar/presenter'
import { useUser } from '@auth0/nextjs-auth0'
import Router from 'next/router'

const TheAppBar: React.FC = () => {
  const handleLogout = () => {
    Router.push('/api/auth/logout')
  }
  const { user } = useUser()
  return <Presenter handleLogout={handleLogout} />
}

export default TheAppBar
