import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/rootReducer'
import {
  ConfirmModalState,
  setConfirmModal,
  clearConfirmModal,
} from '@/store/common'

export default function useStoreConfirmModal() {
  const dispatch = useDispatch()

  const confirmModalStore = useSelector(
    (state: RootState) => state.commonSlice.confirmModal,
  )

  const setConfirmModalStore = useCallback(
    (data: ConfirmModalState) => dispatch(setConfirmModal(data)),
    [dispatch],
  )

  const clearConfirmModalStore = useCallback(
    () => dispatch(clearConfirmModal()),
    [dispatch],
  )

  return { confirmModalStore, setConfirmModalStore, clearConfirmModalStore }
}
