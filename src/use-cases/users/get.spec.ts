import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { GetUserUseCase } from './get'
import { CreateUserUseCase } from './create'
import { CryptHandler } from '@/lib/crypt-handler'

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
			password: 'password'
		})

    const users = await userRepository.list()
    const userId = users.data[0].id

    const user = await sut.execute({
      userId
    })

    expect(user.data?.email).toBe('user@example.com')
	})

  it('should not be able to get a user from another user', async () => {
    await createUserUseCase.execute({
      email: 'user2@example.com',
      password: 'password'
    })

    const users = await userRepository.list()
    const userId = users.data[0].id

    await expect(sut.execute({
      userId
    })).rejects.toBeInstanceOf(Error)
  })

  it('should return data as null if no user is found', async () => {
    await expect(sut.execute({
      userId: 'user-1'
    })).rejects.toBeInstanceOf(Error)
  })
})
