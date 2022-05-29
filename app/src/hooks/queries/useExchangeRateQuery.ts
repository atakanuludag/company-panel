import { useQuery } from 'react-query'
import { QUERY_NAMES } from '@/core/Constants'
import ExchangeRateService from '@/services/ExchangeRateService'

const service = ExchangeRateService
const queryName = QUERY_NAMES.EXCHANGE_RATE

const useExchangeRateQuery = () =>
  useQuery([queryName], () => service.getItems())

export default useExchangeRateQuery
