import { PartialType } from '@nestjs/swagger'
import { EmployeeDto } from '@/employee/dto/employee.dto'

export class UpdateEmployeeDto extends PartialType(EmployeeDto) {}
