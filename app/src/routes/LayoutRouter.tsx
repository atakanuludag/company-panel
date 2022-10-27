import { Outlet, Navigate } from 'react-router-dom'
import Layout from '@/layouts'
import useStoreUser from '@/hooks/useStoreUser'

interface ILayoutRouter {
  guard?: boolean
}

const LayoutRouter = ({ guard = true }: ILayoutRouter) => {
  const { userStore } = useStoreUser()
  const { isLoggedIn } = userStore
  if (!isLoggedIn && guard) return <Navigate to="/login" />

  return (
    <Layout>
      <Outlet context={{}} />
    </Layout>
  )
}

export default LayoutRouter
