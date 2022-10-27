import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class UpdateUserProfileDto {
  @ApiProperty({
    description: 'Kullanıcı Adı',
  })
  @IsNotEmpty()
  @IsString()
  userName: string

  @ApiProperty({
    description: 'Eski Şifre',
  })
  @IsNotEmpty()
  @IsString()
  oldPassword: string

  @ApiProperty({
    description: 'Yeni Şifre',
  })
  @IsNotEmpty()
  @IsString()
  newPassword: string

  @ApiProperty({
    description: 'İsim & Soyisim',
  })
  @IsNotEmpty()
  @IsString()
  displayName: string
}
