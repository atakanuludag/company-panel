import { ObjectId } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsDate,
  IsNumber,
} from 'class-validator'
import { Type } from 'class-transformer'

export class EmployeePermitDto {
  @ApiProperty({
    description: 'Personel',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  employee: ObjectId

  @ApiProperty({
    description: 'İzin başlangıç tarihi',
  })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  startDate: Date

  @ApiProperty({
    description: 'İzin bitiş tarihi',
  })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  endDate: Date

  @ApiProperty({
    description: 'Toplam izin gün sayısı',
  })
  @IsNotEmpty()
  @IsNumber()
  totalDays: number

  @ApiProperty({
    description: 'Açıklama (izin nedeni vs.)',
  })
  @IsOptional()
  @IsOptional()
  description: string
}
