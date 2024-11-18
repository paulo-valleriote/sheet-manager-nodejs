import type { IBaseEntityWithUpdatedAt } from './BaseEntity'

export interface IUser extends IBaseEntityWithUpdatedAt {
	email: string
	passwordHash: string
}
  