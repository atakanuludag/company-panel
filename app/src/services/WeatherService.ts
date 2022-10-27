import axios from '@/core/Axios'
import IWeather from '@/models/IWeather'

const getItemByCityId = async (): Promise<IWeather> => {
  try {
    const ret = await axios.get(`/weather/745042`)
    return ret.data
  } catch (err) {
    console.log('[WeatherService] getItemByCityId() Error: ', err)
    return {} as IWeather
  }
}

const service = {
  getItemByCityId,
}

export default service
