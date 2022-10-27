import { IListQueryResponse } from '../../common/interfaces/query.interface'
import { IEmployee } from './employee.interface'

export interface IEmployeeList extends IListQueryResponse {
  results: IEmployee[]
}
