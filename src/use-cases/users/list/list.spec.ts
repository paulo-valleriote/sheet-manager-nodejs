import { CryptHandler } from '@/lib/crypt-handler'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateUserUseCase } from '../create/create'
import { ListUserUseCase } from './list'

describe('List users use case', () => {
  let userRepository: InMemoryUserRepository
  let createUserUseCase: CreateUserUseCase
  let sut: ListUserUseCase

  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    createUserUseCase = new CreateUserUseCase(userRepository, new CryptHandler())
    sut = new ListUserUseCase(userRepository)
  })

  it('should be able to list created users', async () => {
    await Promise.all([
      createUserUseCase.execute({
        email: 'user1@example.com',
        password: 'password',
      }),
      createUserUseCase.execute({
        email: 'user2@example.com',
        password: 'password',
      }),
    ])

    const users = await sut.execute()
    expect(users.data).toHaveLength(2)
    expect(users.data).toEqual([
      expect.objectContaining({ email: expect.any(String) }),
      expect.objectContaining({ email: expect.any(String) }),
    ])
  })

  it('should return an empty array if no users are found', async () => {
    const users = await sut.execute()
    expect(users.data).toHaveLength(0)
  })
})
