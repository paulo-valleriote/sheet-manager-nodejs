import type { IUserRole } from '@/domain/entities/enums/user-roles'
import type { IUser } from '@/domain/entities/user'

interface IUserReadonlyOperationParams {
  userId: string
}

interface IGetUserParams extends IUserReadonlyOperationParams {
  email?: string
}

interface ICreateUserParams {
  id?: string
  email: string
  passwordHash: string
  role: IUserRole
}

interface IUpdateUserParams extends Partial<IUserReadonlyOperationParams> {
  email?: string
  passwordHash?: string
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
  IDeleteUserParams,
}
