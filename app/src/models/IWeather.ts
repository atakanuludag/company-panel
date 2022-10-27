export default interface IWeather {
  readonly _id: string
  readonly cityId: number
  readonly weatherId: number
  readonly name: string
  readonly description: string
  readonly icon: string
  readonly temp: number
  readonly lon: number
  readonly lat: number
}
