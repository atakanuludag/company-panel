import { HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, ObjectId } from 'mongoose'
import { JwtService } from '@nestjs/jwt'
import { IUser } from '../common/interfaces/user.interface'
import { IUserEntity } from '../common/interfaces/user.interface'
import { UserRole } from '../common/interfaces/enums'
import { User, UserDocument } from './schemas/user.schema'
import { UserDto } from './dto/user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { PasswordHelper } from '../common/helpers/password.helper'
import { ExceptionHelper } from '../common/helpers/exception.helper'
import { CoreMessage } from '../common/messages/core.message'

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly serviceModel: Model<UserDocument>,
    private jwtService: JwtService,
    private passwordHelper: PasswordHelper,
    private readonly coreMessage: CoreMessage,
  ) {}

  async login(user: IUser) {
    try {
      const payload: IUserEntity = {
        userName: user.userName,
        userId: user.id,
        roles: user.roles,
      }
      return {
        accessToken: this.jwtService.sign(payload),
        userId: user.id,
        roles: user.roles,
      }
    } catch (err) {
      throw new ExceptionHelper(
        this.coreMessage.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  async create(registerUserDto: UserDto): Promise<User> {
    try {
      const create = new this.serviceModel(registerUserDto)
      return create.save()
    } catch (err) {
      throw new ExceptionHelper(
        this.coreMessage.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  async validateUser(userName: string, pass: string): Promise<IUser | null> {
    try {
      let findUser: IUser | null = null
      const find = await this.serviceModel
        .find({ userName })
        .select('+password')
        .exec()
      findUser = find.length > 0 ? find[0] : null

      if (findUser != null) {
        const check = await this.passwordHelper.verifyPasswordHash(
          pass,
          findUser.password,
        )
        return check ? findUser : null
      }
      return findUser
    } catch (err) {
      throw new ExceptionHelper(
        this.coreMessage.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  async findUser(userName: string): Promise<boolean> {
    try {
      const exists = await this.serviceModel.exists({ userName })
      return !exists ? false : true
    } catch (err) {
      throw new ExceptionHelper(
        this.coreMessage.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  async findAdminUserCount(): Promise<number> {
    try {
      return await this.serviceModel.countDocuments({ roles: [UserRole.ADMIN] })
    } catch (err) {
      throw new ExceptionHelper(
        this.coreMessage.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  async findUserById(id: ObjectId): Promise<IUser> {
    try {
      return await this.serviceModel.findById(id).select('+password').exec()
    } catch (err) {
      throw new ExceptionHelper(
        this.coreMessage.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  async getItems(): Promise<IUser[]> {
    try {
      const items = await this.serviceModel.find().exec()
      return items
    } catch (err) {
      throw new ExceptionHelper(
        this.coreMessage.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  async update(updateDto: UpdateUserDto, id: ObjectId): Promise<IUser> {
    try {
      const find = await this.serviceModel.findById(id)
      return find.updateOne(updateDto)
    } catch (err) {
      console.log('err', err)
      throw new ExceptionHelper(
        this.coreMessage.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  async delete(id: ObjectId): Promise<void> {
    try {
      await this.serviceModel.findByIdAndDelete(id)
    } catch (err) {
      throw new ExceptionHelper(
        this.coreMessage.BAD_REQUEST,
        HttpStatus.BAD_REQUEST,
      )
    }
  }
}
