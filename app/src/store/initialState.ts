import SliceNames from '@/store/enums'
import { CommonState } from '@/store/common'
import { UserState } from '@/store/user'

export default interface StoreState {
  [SliceNames.USER_SLICE]: UserState
  [SliceNames.COMMON_SLICE]: CommonState
}
