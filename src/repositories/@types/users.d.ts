import type { IUserRole } from '@/domain/entities/enums/user-roles'
import type { IUser } from '@/domain/entities/user'

interface IUserReadonlyOperationParams {
  userId: string
}

/**
 * Parameters for retrieving a user
 * @interface IGetUserParams
 * @property {string} userId - The unique identifier of the user
 * @property {string} [email] - Optional email address of the user
 */
interface IGetUserParams extends IUserReadonlyOperationParams {
  email?: string
}

/**
 * Response structure for getting a single user
 * @interface IGetUserResponse
 * @property {IUser | null} data - The user data or null if not found
 */
interface IGetUserResponse {
  data: IUser | null
}

/**
 * Response structure for listing multiple users
 * @interface IListUsersResponse
 * @property {IUser[]} data - Array of user data
 */
interface IListUsersResponse {
  data: IUser[]
}

/**
 * Parameters for creating a new user
 * @interface ICreateUserParams
 * @property {string} [id] - Optional unique identifier for the user
 * @property {string} email - Email address of the user
 * @property {string} passwordHash - Hashed password of the user
 * @property {IUserRole} role - Role assigned to the user
 */
interface ICreateUserParams {
  id?: string
  email: string
  passwordHash: string
  role: IUserRole
}

/**
 * Parameters for updating an existing user
 * @interface IUpdateUserParams
 * @property {string} [userId] - Optional unique identifier of the user to update
 * @property {string} [email] - Optional new email address
 * @property {string} [passwordHash] - Optional new hashed password
 */
interface IUpdateUserParams extends Partial<IUserReadonlyOperationParams> {
  email?: string
  passwordHash?: string
}

/**
 * Parameters for deleting a user
 * @interface IDeleteUserParams
 * @property {string} userId - The unique identifier of the user to delete
 */
interface IDeleteUserParams extends IUserReadonlyOperationParams {}

export type {
  IGetUserParams,
  IGetUserResponse,
  IListUsersParams,
  IListUsersResponse,
  ICreateUserParams,
  IUpdateUserParams,
  IDeleteUserParams,
}
