import {
  Body,
  Controller,
  Get,
  Param,
  HttpStatus,
  Post,
  UseGuards,
  Patch,
  Delete,
  Query,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger'
import { EmployeeDto } from './dto/employee.dto'
import { UpdateEmployeeDto } from './dto/update-employee.dto'
import { EmployeePermitDto } from './dto/employee-permit.dto'
import { IdParamsDto } from '../common/dto/params.dto'
import { ListQueryDto } from '../common/dto/list-query.dto'
import { EmployeeService } from './employee.service'
import { QueryHelper } from '../common/helpers/query.helper'
import { ExceptionHelper } from '../common/helpers/exception.helper'
import { EmployeeMessage } from '../common/messages/employee.message'
import { CoreMessage } from '../common/messages/core.message'
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard'
import { RolesGuard } from '../common/guards/roles.guard'
import { Roles } from '../common/decorators/roles.decorator'
import { UserRole } from '../common/interfaces/enums'

@ApiTags('Personeller')
@Controller('employee')
export class EmployeeController {
  constructor(
    private readonly service: EmployeeService,
    private readonly coreMessage: CoreMessage,
    private readonly moduleMessage: EmployeeMessage,
    private readonly queryHelper: QueryHelper,
  ) {}

  //todo: permit servisi belki başka bir modüle alınır.

  //#region Personele izin ekler.
  @ApiOperation({
    summary: 'Personele izin ekler.',
  })
  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post('permit')
  async createPermit(@Body() body: EmployeePermitDto) {
    return await this.service.createPermit(body)
  }
  //#endregion

  //#region Personellere ait izin bilgilerini getirir.
  @ApiOperation({
    summary: 'Personellere ait izin bilgilerini getirir.',
  })
  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get('permit')
  async listPermits() {
    return await this.service.getPermitItems()
  }
  //#endregion

  //#region Personel idsine göre izin bilgilerini getirir.
  @ApiOperation({
    summary: 'Personel idsine göre izin bilgilerini getirir.',
  })
  @ApiParam({ name: 'id', type: String })
  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get('permit/getByEmployeeId/:id')
  async listPermitsByEmployeeId(@Param() params: IdParamsDto) {
    return await this.service.getPermitItemsByEmployeeId(params.id)
  }
  //#endregion

  //#region Personel izin günceller
  @ApiOperation({
    summary: 'Personel izin kaydını günceller.',
  })
  @ApiParam({ name: 'id', type: String })
  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch('/permit/:id')
  async updatePermit(
    @Body() body: EmployeePermitDto,
    @Param() params: IdParamsDto,
  ) {
    return await this.service.updatePermit(body, params.id)
  }
  //#endregion

  //#region Personel izin silme işlemi
  @ApiOperation({
    summary: 'Personel izin kaydını siler.',
  })
  @ApiParam({ name: 'id', type: String })
  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete('/permit/:id')
  async deletePermit(@Param() params: IdParamsDto) {
    await this.service.deletePermit(params.id)
  }
  //#endregion

  //#region Kayıtlı personeller
  @ApiOperation({
    summary: 'Kayıtlı personelleri getirir.',
  })
  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get()
  async list(@Query() query: ListQueryDto) {
    const q = this.queryHelper.instance(query)
    return await this.service.getItems(q)
  }
  //#endregion

  //#region Kimlik numarasına göre personel
  @ApiOperation({
    summary: 'Kimlik numarasına göre personel bilgisini getirir.',
  })
  @ApiParam({ name: 'id', type: String })
  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get(':id')
  async getItemById(@Param() params: IdParamsDto) {
    const data = await this.service.getItemById(params.id)
    if (!data)
      throw new ExceptionHelper(
        this.coreMessage.BAD_REQUEST,
        HttpStatus.BAD_REQUEST,
      )
    return data
  }
  //#endregion

  //#region Personel kaydı
  @ApiOperation({
    summary: 'Personel kaydı yapar.',
  })
  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  async create(@Body() body: EmployeeDto) {
    const exists = await this.service.findTcNumber(body.tcNumber)
    if (exists)
      throw new ExceptionHelper(
        this.moduleMessage.EXISTING_TC_NO,
        HttpStatus.BAD_REQUEST,
      )
    return await this.service.create(body)
  }
  //#endregion

  //#region Personel günceller
  @ApiOperation({
    summary: 'Personel kaydını günceller.',
  })
  @ApiParam({ name: 'id', type: String })
  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch(':id')
  async update(@Body() body: UpdateEmployeeDto, @Param() params: IdParamsDto) {
    return await this.service.update(body, params.id)
  }
  //#endregion

  //#region Personel silme işlemi
  @ApiOperation({
    summary: 'Personel kaydını siler.',
  })
  @ApiParam({ name: 'id', type: String })
  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  async delete(@Param() params: IdParamsDto) {
    await this.service.delete(params.id)
  }
  //#endregion
}
