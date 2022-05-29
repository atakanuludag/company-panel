export enum DovizType {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
}

export interface IDovizObject {
  readonly satis: string
  readonly alis: string
  readonly degisim: string
}

export type IDovizResponse = {
  [key in DovizType]: IDovizObject
}
