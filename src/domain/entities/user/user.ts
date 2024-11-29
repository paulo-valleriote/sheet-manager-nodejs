import type { IBaseEntity } from '../base-entity'
import type { IUserRole } from '../enums/user-roles'

/**
 * User entity
 * @description Base application user entity
 */
export interface IUser extends IBaseEntity {
  email: string
  role: IUserRole
  passwordHash: string
}
