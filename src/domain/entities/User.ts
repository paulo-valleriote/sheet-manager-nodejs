import type { IBaseEntity } from './BaseEntity'

export interface IUser extends IBaseEntity {
	email: string
	passwordHash: string
}
