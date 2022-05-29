import { useEffect } from 'react'
import useStoreRouterTitle from '@/hooks/useStoreRouterTitle'

interface IRouteTitle {
  children: JSX.Element
  title?: string
}

function RouteTitle({ title, children }: IRouteTitle) {
  const { setRouterTitleStore } = useStoreRouterTitle()
  useEffect(() => {
    if (title) setRouterTitleStore(title)
  }, [title])
  return children
}

export default RouteTitle
