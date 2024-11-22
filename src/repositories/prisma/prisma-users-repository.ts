import type { IUserRole } from '@/domain/entities/enums/user-roles'
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

    if (!user) return { data: null }

    return {
      data: {
        ...user,
        role: user.role as IUserRole,
      },
    }
  }

  async getByEmail(data: Pick<IGetUserParams, 'email'>): Promise<IGetUserResponse> {
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    })

    if (!user) return { data: null }

    return {
      data: {
        ...user,
        role: user.role as IUserRole,
      },
    }
  }

  async list(): Promise<IListUsersResponse> {
    const users = await prisma.user.findMany()

    return {
      data: users.map((user) => ({
        ...user,
        role: user.role as IUserRole,
      })),
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
