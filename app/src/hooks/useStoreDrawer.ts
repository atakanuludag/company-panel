import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/rootReducer'
import {
  DrawerState,
  setDrawer,
  setDrawerLoading,
  clearDrawer,
} from '@/store/common'

export default function useStoreDrawer() {
  const dispatch = useDispatch()

  const drawerStore = useSelector(
    (state: RootState) => state.commonSlice.drawer,
  )

  const setDrawerStore = useCallback(
    (data: DrawerState) => dispatch(setDrawer(data)),
    [dispatch],
  )
  const clearDrawerStore = useCallback(
    () => dispatch(clearDrawer()),
    [dispatch],
  )

  const setDrawerLoadingStore = useCallback(
    (loading: boolean) => dispatch(setDrawerLoading(loading)),
    [dispatch],
  )

  return {
    drawerStore,
    setDrawerStore,
    setDrawerLoadingStore,
    clearDrawerStore,
  }
}
