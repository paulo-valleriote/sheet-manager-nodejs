import { prisma } from '@/lib/prisma'
import type {
  ICreateUserParams,
  IDeleteUserParams,
  IGetUserParams,
  IGetUserResponse,
  IListUsersResponse,
  IUpdateUserParams,
} from '../@types/users'
import type { IUsersRepository } from '../users-repository'

export class PrismaUsersRepository implements IUsersRepository {
  async create(data: ICreateUserParams): Promise<void> {
    await prisma.user.create({
      data,
    })
  }

  async delete(data: IDeleteUserParams): Promise<void> {
    await prisma.user.delete({
      where: {
        id: data.userId,
      },
    })
  }

  async getById(data: Pick<IGetUserParams, 'userId'>): Promise<IGetUserResponse> {
    const user = await prisma.user.findUnique({
      where: {
        id: data.userId,
      },
    })

    return {
      data: user ?? null,
    }
  }

  async getByEmail(data: Pick<IGetUserParams, 'email'>): Promise<IGetUserResponse> {
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    })

    return {
      data: user ?? null,
    }
  }

  async list(): Promise<IListUsersResponse> {
    const users = await prisma.user.findMany()

    return {
      data: users,
    }
  }

  async update(data: IUpdateUserParams): Promise<void> {
    await prisma.user.update({
      where: {
        id: data.userId,
      },
      data,
    })
  }
}
