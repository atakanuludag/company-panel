import axios from '@/core/Axios'
import ILoginForm from '@/models/ILoginForm'
import IToken from '@/models/IToken'
import IUser, { IProfileUpdateUser } from '@/models/IUser'

const postLogin = async (data: ILoginForm): Promise<IToken | null> => {
  try {
    const ret = await axios.post(`/user/login`, data)
    const tokenData: IToken = ret.data
    if (!tokenData) return null
    return tokenData
  } catch (err) {
    console.log('[UserService] postLogin() Error: ', err)
    return null
  }
}

const getItems = async (): Promise<IUser[]> => {
  try {
    const ret = await axios.get(`/user`)

    const data = ret.data.map((d: IUser) => ({
      ...d,
      createdAt: d.createdAt ? new Date(d.createdAt) : null,
      updatedAt: d.updatedAt ? new Date(d.updatedAt) : null,
    }))

    return data
  } catch (err) {
    console.log('[UserService] getItems() Error: ', err)
    return []
  }
}

const deleteItem = async (id: string): Promise<boolean> => {
  try {
    await axios.delete(`/user/${id}`)
    return true
  } catch (err) {
    console.log('[UserService] deleteItem() Error: ', err)
    return false
  }
}

const getMyProfile = async (): Promise<IUser | null> => {
  try {
    const ret = await axios.get(`/user/profile`)
    return ret.data
  } catch (err) {
    console.log('[UserService] getMyProfile() Error: ', err)
    return null
  }
}

const createItem = async (data: IUser): Promise<boolean> => {
  try {
    await axios.post(`/user`, data)
    return true
  } catch (err) {
    console.log('[UserService] createItem() Error: ', err)
    return false
  }
}

const patchItem = async (data: IUser, id: string): Promise<boolean> => {
  try {
    await axios.patch(`/user/${id}`, data)
    return true
  } catch (err) {
    console.log('[UserService] patchItem() Error: ', err)
    return false
  }
}

const updateMyProfile = async (data: IProfileUpdateUser): Promise<boolean> => {
  try {
    await axios.patch(`/user/profile`, data)
    return true
  } catch (err) {
    console.log('[UserService] updateMyProfile() Error: ', err)
    return false
  }
}

const service = {
  postLogin,
  getItems,
  deleteItem,
  getMyProfile,
  createItem,
  patchItem,
  updateMyProfile,
}

export default service
