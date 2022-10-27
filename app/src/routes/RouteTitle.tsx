import { useEffect } from 'react'
import { UserRole } from '@/models/enums'
import useStoreRouterTitle from '@/hooks/useStoreRouterTitle'
import useStoreUser from '@/hooks/useStoreUser'
import PageMessage from '@/components/PageMessage'

interface IRouteTitle {
  children: JSX.Element
  title: string
  roles?: UserRole[]
  roleGuard?: boolean
}

function RouteTitle({
  title,
  children,
  roles,
  roleGuard = false,
}: IRouteTitle) {
  const { setRouterTitleStore } = useStoreRouterTitle()
  const { userStore } = useStoreUser()
  const userRoles = userStore.roles

  const isPermission =
    roles && userRoles
      ? userRoles.some((r: UserRole) => roles.includes(r))
      : false

  useEffect(() => {
    if (title) setRouterTitleStore(title)
  }, [title])

  if (isPermission || !roleGuard) return children
  else
    return (
      <PageMessage
        type="permission"
        title="Yetki Hatası"
        description="Bu sayfaya giriş yetkiniz bulunmamaktadır."
        buttonShow
        buttonText="Ana Sayfaya Git"
      />
    )
}

export default RouteTitle
