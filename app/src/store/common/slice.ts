import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  CommonState,
  DrawerState,
  ConfirmModalState,
} from '@/store/common/type'
import SliceNames from '@/store/enums'

const initialState: CommonState = {
  drawer: {
    open: false,
    title: '',
    content: null,
    type: null,
    confirm: false,
    data: null,
    loading: false,
  },
  confirmModal: {
    open: false,
    title: '',
    content: null,
    confirm: false,
    data: null,
    loading: false,
  },
  routerTitle: '',
}

const common = createSlice({
  name: SliceNames.COMMON_SLICE,
  initialState,
  reducers: {
    setDrawer(state: CommonState, action: PayloadAction<DrawerState>) {
      return {
        ...state,
        drawer: { ...action.payload },
      }
    },
    setDrawerLoading(state: CommonState, action: PayloadAction<boolean>) {
      return {
        ...state,
        drawer: { ...state.drawer, loading: action.payload, confirm: false },
      }
    },
    setConfirmModal(
      state: CommonState,
      action: PayloadAction<ConfirmModalState>,
    ) {
      return {
        ...state,
        confirmModal: { ...action.payload },
      }
    },
    setRouterTitle(state: CommonState, action: PayloadAction<string>) {
      return {
        ...state,
        routerTitle: action.payload,
      }
    },
    clearDrawer(state: CommonState) {
      return {
        ...state,
        drawer: initialState.drawer,
      }
    },
    clearConfirmModal(state: CommonState) {
      return {
        ...state,
        confirmModal: initialState.confirmModal,
      }
    },
  },
})

export const {
  setDrawer,
  setDrawerLoading,
  setConfirmModal,
  setRouterTitle,
  clearDrawer,
  clearConfirmModal,
} = common.actions
export default common.reducer
