import { randomUUID } from 'node:crypto';
import type { IUser } from '@/domain/entities/User';
import type { IUsersRepository } from '../users-repository';
import type { ICreateUserParams, IDeleteUserParams, IGetUserParams, IGetUserResponse, IListUsersParams, IListUsersResponse, IUpdateUserParams } from '../@types/users';

export class InMemoryUserRepository implements IUsersRepository {
  private users: IUser[] = []

  async list(): Promise<IListUsersResponse> {
    const users = this.users

    return {
      data: users
    }
  }

  async getById(data: Pick<IGetUserParams, 'userId'>): Promise<IGetUserResponse> {
    const user = this.users.find((user) => user.id === data.userId)

    return {
      data: user ?? null
    }
  }

  async getByEmail(data: Pick<IGetUserParams, 'email'>): Promise<IGetUserResponse> {
    const user = this.users.find((user) => user.email === data.email)

    return {
      data: user ?? null
    }
  }

  async create(data: ICreateUserParams): Promise<void> {
    this.users.push({
      id: randomUUID(),
      email: data.email,
      passwordHash: data.passwordHash,
      createdAt: new Date(),
    })
  }

  async update(data: IUpdateUserParams): Promise<void> {
    const userIndex = this.users.findIndex((user) => 
      user.id === data.userId
    )

    this.users[userIndex] = {
      ...this.users[userIndex],
      ...data,
    }
	}
  
  async delete(data: IDeleteUserParams): Promise<void> {
    const userIndex = this.users.findIndex((user) => 
      user.id === data.userId
    )

    this.users.splice(userIndex, 1)
  }
}
