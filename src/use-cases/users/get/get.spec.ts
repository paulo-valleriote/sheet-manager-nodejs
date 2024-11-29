import { CryptHandler } from '@/lib/crypt-handler'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from '../../_errors/resource-not-found-error'
import { CreateUserUseCase } from '../create/create'
import { GetUserUseCase } from './get'

describe('Get user use case', () => {
  let userRepository: InMemoryUserRepository
  let createUserUseCase: CreateUserUseCase
  let sut: GetUserUseCase

  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    createUserUseCase = new CreateUserUseCase(userRepository, new CryptHandler())
    sut = new GetUserUseCase(userRepository)
  })

  it('should be able to get a user', async () => {
    await createUserUseCase.execute({
      email: 'user@example.com',
      password: 'password',
    })

    const users = await userRepository.list()
    const userId = users.data[0].id

    const user = await sut.execute({
      userId,
    })

    expect(user.data?.email).toBe('user@example.com')
  })

  it('should thorw ResourceNotFoundError if user not found', async () => {
    await expect(
      sut.execute({
        userId: 'user-1',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
