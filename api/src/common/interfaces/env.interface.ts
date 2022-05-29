export interface IEnv {
  MONGODB_URI: String
  API_PREFIX: string
  API_PORT: string
  API_SWAGGER_URL: string
  JWT_SECRET_KEY: string
  JWT_EXPIRES_IN: string
  EXCHANGE_RATE_UPDATE_MIN: number
  OPEN_WEATHER_MAP_APP_ID: string
  OPEN_WEATHER_MAP_CITY_IDS: string
  OPEN_WEATHER_MAP_LANG: string
  OPEN_WEATHER_MAP_UNITS: string
  WEATHER_UPDATE_MIN: number
}
