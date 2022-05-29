import { useQuery } from 'react-query'
import { QUERY_NAMES } from '@/core/Constants'
import EmployeeService from '@/services/EmployeeService'
import IListQuery from '@/models/IListQuery'

const service = EmployeeService
const queryName = QUERY_NAMES.EMPLOYEE

const useEmployeeQuery = (enabled?: boolean, query?: IListQuery) =>
  useQuery([queryName, query], () => service.getItems(query), {
    enabled,
  })

export default useEmployeeQuery
