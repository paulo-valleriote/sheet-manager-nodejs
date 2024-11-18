import type { IBaseEntityWithUpdatedAt } from './BaseEntity'

export interface ISheet extends IBaseEntityWithUpdatedAt {
	name: string
	userId: string
}
