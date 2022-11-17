import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsString } from 'class-validator'
import { UserRole } from '@/common/interfaces/enums'

export class TokenDto {
  @ApiProperty({
    description: 'Access Token',
  })
  @IsNotEmpty()
  @IsString()
  accessToken: string

  @ApiProperty({
    description: 'Kullanıcı ID',
  })
  @IsNotEmpty()
  @IsString()
  userId: string

  @ApiProperty({
    description: 'İzinler',
    type: String,
    enum: UserRole,
  })
  @IsNotEmpty()
  @IsEnum(UserRole, { each: true })
  roles: UserRole[]
}
