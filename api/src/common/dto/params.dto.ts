import { IsString } from 'class-validator'
import { ObjectId } from 'mongoose'

export class IdParamsDto {
  @IsString()
  id: ObjectId
}

export class CityIdParamsDto {
  @IsString()
  cityId: number
}
