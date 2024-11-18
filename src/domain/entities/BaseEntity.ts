export interface IBaseEntity {
	id: string
	createdAt: Date
}

export interface IBaseEntityWithUpdatedAt extends IBaseEntity {
	updatedAt?: Date
}
