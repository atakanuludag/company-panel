import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Get,
  Patch,
  UseGuards,
  Request,
  Param,
  Delete,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger'
import { UserService } from './user.service'
import { UserDto } from './dto/user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UpdateUserProfileDto } from './dto/update-user-profile.dto'
import { LoginUserDto } from './dto/login-user.dto'
import { TokenDto } from './dto/token.dto'
import { IdParamsDto } from '../common/dto/params.dto'
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard'
import { LocalAuthGuard } from '../common/guards/local-auth.guard'
import { PasswordHelper } from '../common/helpers/password.helper'
import { ExceptionHelper } from '../common/helpers/exception.helper'
import { UserMessage } from '../common/messages/user.message'
import { CoreMessage } from '../common/messages/core.message'
import { IUser } from '../common/interfaces/user.interface'
import { IUserEntity } from '../common/interfaces/user.interface'
import { RolesGuard } from '../common/guards/roles.guard'
import { Roles } from '../common/decorators/roles.decorator'
import { UserRole } from '../common/interfaces/enums'
import { User } from '../common/decorators/user.decorator'

@ApiTags('Kullanıcılar')
@Controller('user')
export class UserController {
  constructor(
    private readonly service: UserService,
    private passwordHelper: PasswordHelper,
    private readonly moduleMessage: UserMessage,
    private readonly coreMessage: CoreMessage,
  ) {}

  //#region Giriş yap
  @ApiOperation({
    summary: 'Giriş yap',
  })
  @ApiBody({ type: LoginUserDto })
  @ApiOkResponse({
    description: 'Giriş başarılı',
    type: TokenDto,
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.service.login(req.user)
  }
  //#endregion

  //#region Kullanıcı Kaydı
  @ApiOperation({
    summary: 'Kullanıcı Kaydı',
  })
  @ApiCreatedResponse({ description: 'Kayıt başarılı.', type: UserDto })
  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  async create(@Body() body: UserDto) {
    const userCheck = await this.service.findUser(body.userName)
    if (userCheck)
      throw new ExceptionHelper(
        this.moduleMessage.EXISTING_USER,
        HttpStatus.BAD_REQUEST,
      )
    body.password = await this.passwordHelper.passwordHash(body.password)
    return await this.service.create(body)
  }
  //#endregion

  //#region Giriş yapmış kullanıcı profil bilgisi
  @ApiOperation({
    summary: 'Giriş yapmış kullanıcı profil bilgisi',
  })
  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async profile(@Request() req) {
    const userId = req.user.userId
    const user: IUser = await this.service.findUserById(userId)
    return user
  }
  //#endregion

  //#region Kullanıcı listesi
  @ApiOperation({
    summary: 'Kullanıcı listesi',
  })
  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get()
  async list() {
    return await this.service.getItems()
  }
  //#endregion

  //#region Kimlik numarasına göre kullanıcı bilgisi
  @ApiOperation({
    summary: 'Kimlik numarasına göre kullanıcı bilgisini getirir.',
  })
  @ApiParam({ name: 'id', type: String })
  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get(':id')
  async userById(@Param() params: IdParamsDto) {
    return await this.service.findUserById(params.id)
  }
  //#endregion

  @ApiOperation({
    summary: 'Kullanıcı kendi profil bilgilerini düzenleyebilir.',
  })
  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard)
  @Patch('profile')
  async updateProfile(
    @User() user: IUserEntity,
    @Body() body: UpdateUserProfileDto,
  ) {
    const userData = await this.service.findUserById(user.userId)
    const oldPasswordVerify = await this.passwordHelper.verifyPasswordHash(
      body.oldPassword,
      userData.password,
    )
    const newPasswordHash = await this.passwordHelper.passwordHash(
      body.newPassword,
    )
    if (!oldPasswordVerify)
      throw new ExceptionHelper(
        this.moduleMessage.OLD_WRONG_PASSWORD,
        HttpStatus.BAD_REQUEST,
      )
    delete body.oldPassword
    delete body.newPassword
    const data: UpdateUserDto = {
      ...body,
      password: newPasswordHash,
    }
    return await this.service.update(data, user.userId)
  }

  @ApiOperation({
    summary: 'Kimlik numarasına göre kullanıcıyı günceller.',
  })
  @ApiParam({ name: 'id', type: String })
  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch(':id')
  async update(
    //@User() user: IUserEntity,
    @Body() body: UpdateUserDto,
    @Param() params: IdParamsDto,
  ) {
    const userData = await this.service.findUserById(params.id)

    const findUserName =
      userData.userName !== body.userName ? body.userName : undefined

    const userCheck = await this.service.findUser(findUserName)

    if (userCheck)
      throw new ExceptionHelper(
        this.moduleMessage.EXISTING_USER,
        HttpStatus.BAD_REQUEST,
      )
    if (body.password)
      body.password = await this.passwordHelper.passwordHash(body.password)
    return await this.service.update(body, params.id)
  }

  @ApiOperation({
    summary: 'Kimlik numarasına göre kullanıcıyı siler.',
  })
  @ApiParam({ name: 'id', type: String })
  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  async delete(@Param() params: IdParamsDto) {
    await this.service.delete(params.id)
  }
}
