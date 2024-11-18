import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { CreateUserUseCase } from './create'
import { ListUserUseCase } from './list'
import { CryptHandler } from '@/lib/crypt-handler'

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
        password: 'password'
      }),
      createUserUseCase.execute({
        email: 'user2@example.com',
        password: 'password'
      })
    ])

    const users = await sut.execute()
    expect(users.data).toHaveLength(2)
    expect(users.data[0].email).toBe('user1@example.com')
    expect(users.data[1].email).toBe('user2@example.com')
	})

  it('should not be able to list users from another user', async () => {
    await Promise.all([
      createUserUseCase.execute({
        email: 'user2@example.com',
        password: 'password'
      })
    ])

    const users = await sut.execute()
    expect(users.data).toHaveLength(0)
  })

  it('should return an empty array if no users are found', async () => {
    const users = await sut.execute()
    expect(users.data).toHaveLength(0)
  })
})
