import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class LoginUserDto {
  @ApiProperty({
    description: 'Kullanıcı Adı',
  })
  @IsNotEmpty()
  @IsString()
  username: string

  @ApiProperty({
    description: 'Şifre',
  })
  @IsNotEmpty()
  @IsString()
  password: string
}
