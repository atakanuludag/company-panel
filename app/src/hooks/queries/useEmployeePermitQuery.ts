import { useQuery } from 'react-query'
import { QUERY_NAMES } from '@/core/Constants'
import EmployeeService from '@/services/EmployeeService'

const service = EmployeeService
const queryName = QUERY_NAMES.EMPLOYEEPERMIT

const useEmployeePermitQuery = () =>
  useQuery([queryName], () => service.getPermitItems())

export default useEmployeePermitQuery
