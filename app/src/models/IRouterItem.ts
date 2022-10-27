import { IconType } from 'react-icons'
import { UserRole } from '@/models/enums'

export default interface IRouterItem {
  name: string
  icon: IconType
  url: string
  roles: UserRole[]
}
