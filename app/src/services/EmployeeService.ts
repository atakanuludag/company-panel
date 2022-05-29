import axios from '@/core/Axios'
import IListResponse from '@/models/IListResponse'
import IListQuery from '@/models/IListQuery'
import IEmployee from '@/models/IEmployee'
import IEmployeePermit, { IEmployeePermitForm } from '@/models/IEmployeePermit'

const getItems = async (params?: IListQuery): Promise<IListResponse> => {
  try {
    const ret = await axios.get(`/employee`, {
      params,
    })
    let data: IListResponse = ret.data

    const d = data.results.map((d: IEmployee) => ({
      ...d,
      startingDate: d.startingDate ? new Date(d.startingDate) : null,
      endDate: d.endDate ? new Date(d.endDate) : null,
    }))

    return {
      ...data,
      results: d,
    }
  } catch (err) {
    console.log('[EmployeeService] getItems() Error: ', err)
    return {} as IListResponse
  }
}

const getItemById = async (id: string): Promise<IEmployee> => {
  try {
    const ret = await axios.get(`/employee/${id}`)

    return {
      ...ret.data,
      startingDate: ret.data.startingDate
        ? new Date(ret.data.startingDate)
        : null,
      endDate: ret.data.endDate ? new Date(ret.data.endDate) : null,
    }
  } catch (err) {
    console.log('[EmployeeService] getItemById() Error: ', err)
    return {} as IEmployee
  }
}

const postItem = async (data: IEmployee): Promise<boolean> => {
  try {
    await axios.post(`/employee`, data)
    return true
  } catch (err) {
    console.log('[EmployeeService] postItem() Error: ', err)
    return false
  }
}

const patchItem = async (data: IEmployee, id: string): Promise<boolean> => {
  try {
    await axios.patch(`/employee/${id}`, data)
    return true
  } catch (err) {
    console.log('[EmployeeService] patchItem() Error: ', err)
    return false
  }
}

const deleteItem = async (id: string): Promise<boolean> => {
  try {
    await axios.delete(`/employee/${id}`)
    return true
  } catch (err) {
    console.log('[EmployeeService] deleteItem() Error: ', err)
    return false
  }
}

const getPermitItems = async (): Promise<IEmployeePermit[]> => {
  try {
    const ret = await axios.get(`/employee/permit`)
    return ret.data.map((d: IEmployeePermit) => ({
      ...d,
      startDate: d.startDate ? new Date(d.startDate) : null,
      endDate: d.endDate ? new Date(d.endDate) : null,
      createdAt: d.createdAt ? new Date(d.createdAt) : null,
    }))
  } catch (err) {
    console.log('[EmployeeService] getPermitItems() Error: ', err)
    return []
  }
}

const getPermitItemsByEmployeeId = async (
  id: string,
): Promise<IEmployeePermit[]> => {
  try {
    const ret = await axios.get(`/employee/permit/getByEmployeeId/${id}`)
    return ret.data.map((d: IEmployeePermit) => ({
      ...d,
      startDate: d.startDate ? new Date(d.startDate) : null,
      endDate: d.endDate ? new Date(d.endDate) : null,
      createdAt: d.createdAt ? new Date(d.createdAt) : null,
    }))
  } catch (err) {
    console.log('[EmployeeService] getPermitItemsByEmployeeId() Error: ', err)
    return []
  }
}

const postPermitItem = async (data: IEmployeePermitForm): Promise<boolean> => {
  try {
    await axios.post(`/employee/permit`, data)
    return true
  } catch (err) {
    console.log('[EmployeeService] postPermitItem() Error: ', err)
    return false
  }
}

const patchPermitItem = async (
  data: IEmployeePermitForm,
  id: string,
): Promise<boolean> => {
  try {
    await axios.patch(`/employee/permit/${id}`, data)
    return true
  } catch (err) {
    console.log('[EmployeeService] patchPermitItem() Error: ', err)
    return false
  }
}

const deletePermitItem = async (id: string): Promise<boolean> => {
  try {
    await axios.delete(`/employee/permit/${id}`)
    return true
  } catch (err) {
    console.log('[EmployeeService] deletePermitItem() Error: ', err)
    return false
  }
}

const service = {
  getItems,
  getItemById,
  postItem,
  patchItem,
  deleteItem,
  getPermitItems,
  getPermitItemsByEmployeeId,
  postPermitItem,
  patchPermitItem,
  deletePermitItem,
}

export default service
