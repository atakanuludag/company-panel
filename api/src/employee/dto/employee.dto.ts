import { ApiProperty } from '@nestjs/swagger'
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEnum,
  IsDate,
} from 'class-validator'
import { Type } from 'class-transformer'
import { Gender } from '../../common/interfaces/enums'

export class EmployeeDto {
  @ApiProperty({
    description: 'TC Numarası',
  })
  @IsNotEmpty()
  @IsString()
  tcNumber: string

  @ApiProperty({
    description: 'İsim & Soyisim',
  })
  @IsNotEmpty()
  @IsString()
  displayName: string

  @ApiProperty({
    description: 'Cep Telefonu',
  })
  @IsOptional()
  @IsString()
  gsmNumber: string

  @ApiProperty({
    description: 'Ev Telefonu',
  })
  @IsOptional()
  @IsString()
  homePhone: string

  @ApiProperty({
    description: 'Adres',
  })
  @IsOptional()
  @IsString()
  address: string

  @ApiProperty({
    description: 'İşe giriş tarihi',
  })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  startingDate: Date

  @ApiProperty({
    description: 'İşten çıkış tarihi',
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  endDate: Date

  @ApiProperty({
    description: 'Cinsiyet',
    type: String,
    enum: Gender,
  })
  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender
}
