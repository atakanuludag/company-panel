import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { EmployeeController } from './employee.controller'
import { EmployeeService } from './employee.service'
import { Employee, EmployeeSchema } from './schemas/employee.schema'
import {
  EmployeePermit,
  EmployeePermitSchema,
} from './schemas/employee-permit.schema'

import { ExceptionHelper } from '../common/helpers/exception.helper'
import { EmployeeMessage } from '../common/messages/employee.message'
import { CoreMessage } from '../common/messages/core.message'
import { QueryHelper } from '../common/helpers/query.helper'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Employee.name, schema: EmployeeSchema },
      { name: EmployeePermit.name, schema: EmployeePermitSchema },
    ]),
  ],
  controllers: [EmployeeController],
  providers: [
    QueryHelper,
    CoreMessage,
    EmployeeMessage,
    ExceptionHelper,
    EmployeeService,
  ],
})
export class EmployeeModule {}
