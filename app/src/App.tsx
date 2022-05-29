import { useEffect } from 'react'
import { useToast } from '@chakra-ui/react'
import Routes from '@/routes'
import Drawer from '@/components/Drawer'
import ConfirmModal from '@/components/ConfirmModal'
import useStoreUser from '@/hooks/useStoreUser'
import UserService from '@/services/UserService'
import { axiosResponseInterceptors } from '@/core/Axios'

function App() {
  const { userStore, setUserStore, logoutUserStore } = useStoreUser()
  const toast = useToast()

  useEffect(() => axiosResponseInterceptors(toast, logoutUserStore), [])

  useEffect(() => {
    if (userStore.accessToken) setUserInformation()
  }, [userStore.accessToken])

  const setUserInformation = async () => {
    const profile = await UserService.getMyProfile()
    setUserStore({
      ...userStore,
      ...profile,
      loading: false,
    })
  }

  return (
    <>
      <Routes />
      <Drawer />
      <ConfirmModal />
    </>
  )
}

export default App
