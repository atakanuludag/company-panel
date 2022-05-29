import { DrawerType } from '@/models/enums'

export interface DrawerState {
  open: boolean
  title: string
  content: JSX.Element | null
  type: DrawerType | null
  confirm: boolean
  data: any
  loading: boolean
}

export interface ConfirmModalState {
  open: boolean
  title: string
  content: JSX.Element | null
  confirm: boolean
  data: any
  loading: boolean
}

export interface CommonState {
  drawer: DrawerState
  confirmModal: ConfirmModalState
  routerTitle: string
}
