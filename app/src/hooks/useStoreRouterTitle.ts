import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/rootReducer'
import { setRouterTitle } from '@/store/common'

export default function useStoreRouterTitle() {
  const dispatch = useDispatch()

  const routerTitleStore = useSelector(
    (state: RootState) => state.commonSlice.routerTitle,
  )

  const setRouterTitleStore = useCallback(
    (data: string) => dispatch(setRouterTitle(data)),
    [dispatch],
  )

  return { routerTitleStore, setRouterTitleStore }
}
