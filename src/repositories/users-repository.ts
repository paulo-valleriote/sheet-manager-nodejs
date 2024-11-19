import type {
  ICreateUserParams,
  IDeleteUserParams,
  IGetUserParams,
  IGetUserResponse,
  IListUsersResponse,
  IUpdateUserParams,
} from './@types/users'

export interface IUsersRepository {
  create(data: ICreateUserParams): Promise<void>
  delete(data: IDeleteUserParams): Promise<void>
  getById(data: Pick<IGetUserParams, 'userId'>): Promise<IGetUserResponse>
  getByEmail(data: Pick<IGetUserParams, 'email'>): Promise<IGetUserResponse>
  list(): Promise<IListUsersResponse>
  update(data: IUpdateUserParams): Promise<void>
}
