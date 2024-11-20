import type { IBaseEntity } from './base-entity'

export interface IUser extends IBaseEntity {
  email: string
  passwordHash: string
}
