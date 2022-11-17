import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { IUser } from 'src/common/interfaces/user.interface'
import { UserService } from '@/user/user.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly service: UserService) {
    super()
  }

  async validate(username: string, password: string): Promise<IUser> {
    const user = await this.service.validateUser(username, password)
    if (!user) {
      throw new UnauthorizedException()
    }
    return user
  }
}
