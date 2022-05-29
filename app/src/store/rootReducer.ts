import { combineReducers } from '@reduxjs/toolkit'
import { commonReducers } from '@/store/common'
import { userReducers } from '@/store/user'
import IStoreState from '@/store/initialState'
import SliceNames from '@/store/enums'

const rootReducer = combineReducers<IStoreState>({
  [SliceNames.USER_SLICE]: userReducers,
  [SliceNames.COMMON_SLICE]: commonReducers,
})

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>
