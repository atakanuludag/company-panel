import { PartialType } from '@nestjs/swagger'
import { UserDto } from '@/user/dto/user.dto'

export class UpdateUserDto extends PartialType(UserDto) {}
