import ILocalStorage from '@/models/ILocalStroge'

const QUERY_NAMES = {
  EMPLOYEE: 'employee',
  EMPLOYEEPERMIT: 'employee-permit',
  USER: 'user',
  EXCHANGE_RATE: 'exchange-rate',
  WEATHER: 'weather',
  HOLIDAYS_CALENDAR: 'holidays-calendar',
}

const LS_AUTH: ILocalStorage = {
  key: 'auth',
}

const LOCAL_STORAGES = {
  LS_AUTH,
}

export { QUERY_NAMES, LOCAL_STORAGES }
