import { useQuery } from 'react-query'
import { QUERY_NAMES } from '@/core/Constants'
import UserService from '@/services/UserService'

const service = UserService
const queryName = QUERY_NAMES.USER

const useUserQuery = () => useQuery([queryName], () => service.getItems())

export default useUserQuery
