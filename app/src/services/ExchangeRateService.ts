import axios from '@/core/Axios'
import IExchangeRate from '@/models/IExchangeRate'

const getItems = async (): Promise<IExchangeRate[]> => {
  try {
    const ret = await axios.get(`/exchange-rate`)
    return ret.data
  } catch (err) {
    console.log('[ExchangeRateService] getItems() Error: ', err)
    return []
  }
}

const service = {
  getItems,
}

export default service
