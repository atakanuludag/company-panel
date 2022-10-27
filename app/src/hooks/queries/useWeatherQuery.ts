import { useQuery } from 'react-query'
import { QUERY_NAMES } from '@/core/Constants'
import WeatherService from '@/services/WeatherService'

const service = WeatherService
const queryName = QUERY_NAMES.WEATHER

const useWeatherQuery = () =>
  useQuery([queryName], () => service.getItemByCityId())

export default useWeatherQuery
