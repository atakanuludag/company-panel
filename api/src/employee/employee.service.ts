import { HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, ObjectId } from 'mongoose'
import { IEmployee } from './interfaces/employee.interface'
import { IEmployeePermit } from './interfaces/employee-permit.interface'
import { IQuery } from '../common/interfaces/query.interface'
import { IEmployeeList } from './interfaces/employee-list.interface'
import { Employee, EmployeeDocument } from './schemas/employee.schema'
import {
  EmployeePermit,
  EmployeePermitDocument,
} from './schemas/employee-permit.schema'
import { EmployeeDto } from './dto/employee.dto'
import { UpdateEmployeeDto } from './dto/update-employee.dto'
import { EmployeePermitDto } from './dto/employee-permit.dto'
import { ExceptionHelper } from '../common/helpers/exception.helper'
import { CoreMessage } from '../common/messages/core.message'

import { differenceInYears } from 'date-fns'

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name)
    private readonly employeeModel: Model<EmployeeDocument>,
    @InjectModel(EmployeePermit.name)
    private readonly employeePermitModel: Model<EmployeePermitDocument>,
    private readonly coreMessage: CoreMessage,
  ) {}

  async create(data: EmployeeDto): Promise<IEmployee> {
    try {
      const create = new this.employeeModel(data)
      return create.save()
    } catch (err) {
      throw new ExceptionHelper(
        this.coreMessage.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  async update(body: UpdateEmployeeDto, id: ObjectId): Promise<IEmployee> {
    try {
      return await this.employeeModel.findByIdAndUpdate(
        id,
        {
          $set: body,
        },
        { new: true },
      )
    } catch (err) {
      throw new ExceptionHelper(
        this.coreMessage.BAD_REQUEST,
        HttpStatus.BAD_REQUEST,
      )
    }
  }

  async getItems(query: IQuery): Promise<IEmployeeList> {
    try {
      const { pagination, searchQuery, order } = query
      const { page, pageSize, skip } = pagination

      const items = await this.employeeModel
        .find(searchQuery)
        .limit(pageSize)
        .sort(order)
        .skip(skip)
        .exec()

      const count = await this.employeeModel.find(searchQuery).countDocuments()

      const totalPages = Math.ceil(count / pageSize)

      const data: IEmployeeList = {
        results: items,
        currentPage: page,
        currentPageSize: items.length,
        pageSize: pageSize,
        totalPages,
        totalResults: count,
        hasNextPage: page < totalPages ? true : false,
      }
      return data
    } catch (err) {
      throw new ExceptionHelper(
        this.coreMessage.BAD_REQUEST,
        HttpStatus.BAD_REQUEST,
      )
    }
  }

  async getItemById(_id: ObjectId): Promise<IEmployee> {
    try {
      let item = await this.employeeModel.findOne({ _id }).exec()
      const startingDate = item.startingDate
      const diff = differenceInYears(new Date(), new Date(startingDate))
      const permitItems = await this.getPermitItemsByEmployeeId(_id)
      const totalPermitDays = permitItems.reduce((acc, permit) => {
        return acc + permit.totalDays
      }, 0)

      /*
 Bir yıldan beş yıla kadar (beş yıl dahil) olanlara ondört günden,
 Beş yıldan fazla onbeş yıldan az olanlara yirmi günden,
 Onbeş yıl (dahil) ve daha fazla olanlara yirmialtı günden az olamaz. (Ek cümle: 10/9/2014-6552/5 md.)
      */

      return {
        ...item.toJSON(),
        remainingPermitDays: 0,
        totalPermitDays,
      } as any
    } catch (err) {
      throw new ExceptionHelper(
        this.coreMessage.BAD_REQUEST,
        HttpStatus.BAD_REQUEST,
      )
    }
  }

  async getItemByEmail(email: string): Promise<IEmployee> {
    try {
      return await this.employeeModel.findOne({ email }).exec()
    } catch (err) {
      throw new ExceptionHelper(
        this.coreMessage.BAD_REQUEST,
        HttpStatus.BAD_REQUEST,
      )
    }
  }

  async delete(id: ObjectId): Promise<void> {
    try {
      await this.employeeModel.findByIdAndDelete(id)
    } catch (err) {
      throw new ExceptionHelper(
        this.coreMessage.BAD_REQUEST,
        HttpStatus.BAD_REQUEST,
      )
    }
  }

  async findTcNumber(tcNumber: string): Promise<boolean> {
    try {
      return await this.employeeModel.exists({ tcNumber })
    } catch (err) {
      throw new ExceptionHelper(
        this.coreMessage.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  async createPermit(data: EmployeePermitDto): Promise<IEmployeePermit> {
    try {
      const create = new this.employeePermitModel(data)
      return create.save()
    } catch (err) {
      throw new ExceptionHelper(
        this.coreMessage.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  async getPermitItems(): Promise<IEmployeePermit[]> {
    try {
      return await this.employeePermitModel.find().populate('employee').exec()
    } catch (err) {
      throw new ExceptionHelper(
        this.coreMessage.BAD_REQUEST,
        HttpStatus.BAD_REQUEST,
      )
    }
  }

  async getPermitItemsByEmployeeId(
    employeeId: ObjectId,
  ): Promise<IEmployeePermit[]> {
    try {
      return await this.employeePermitModel
        .find({ employee: employeeId })
        .exec()
    } catch (err) {
      throw new ExceptionHelper(
        this.coreMessage.BAD_REQUEST,
        HttpStatus.BAD_REQUEST,
      )
    }
  }

  async updatePermit(
    body: EmployeePermitDto,
    id: ObjectId,
  ): Promise<IEmployeePermit> {
    try {
      return await this.employeePermitModel.findByIdAndUpdate(
        id,
        {
          $set: body,
        },
        { new: true },
      )
    } catch (err) {
      throw new ExceptionHelper(
        this.coreMessage.BAD_REQUEST,
        HttpStatus.BAD_REQUEST,
      )
    }
  }

  async deletePermit(id: ObjectId): Promise<void> {
    try {
      await this.employeePermitModel.findByIdAndDelete(id)
    } catch (err) {
      throw new ExceptionHelper(
        this.coreMessage.BAD_REQUEST,
        HttpStatus.BAD_REQUEST,
      )
    }
  }
}
