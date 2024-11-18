import type { IUser } from '@/domain/entities/User'

interface IUserReadonlyOperationParams {
  userId: string
}

interface IGetUserParams extends IUserReadonlyOperationParams {
  email?: string
}

interface ICreateUserParams {
	email: string
	passwordHash: string
}

interface IUpdateUserParams extends IUserReadonlyOperationParams {
	email: string
}

interface IDeleteUserParams extends IUserReadonlyOperationParams {}

interface IGetUserResponse {
	data: IUser | null
}

interface IListUsersResponse {
	data: IUser[]
}

export type {
	IGetUserParams,
	IGetUserResponse,
	IListUsersParams,
	IListUsersResponse,
	ICreateUserParams,
	IUpdateUserParams,
	IDeleteUserParams
}
