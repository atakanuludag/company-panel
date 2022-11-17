import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, IsOptional, IsEnum } from 'class-validator'
import { UserRole } from '@/common/interfaces/enums'

export class UserDto {
  @ApiProperty({
    description: 'Kullanıcı Adı',
  })
  @IsNotEmpty()
  @IsString()
  userName: string

  @ApiProperty({
    description: 'Şifre',
  })
  @IsNotEmpty()
  @IsString()
  password: string

  @ApiProperty({
    description: 'İsim & Soyisim',
  })
  @IsNotEmpty()
  @IsString()
  displayName: string

  @ApiProperty({
    description: 'İzinler',
    type: [String],
    enum: UserRole,
  })
  @IsOptional()
  @IsEnum(UserRole, { each: true })
  roles: UserRole[]
}
