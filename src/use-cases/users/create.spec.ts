import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { CreateUserUseCase } from './create'
import { CryptHandler } from '@/lib/crypt-handler'

describe('Create user use case', () => {
  let userRepository: InMemoryUserRepository
  let sut: CreateUserUseCase

  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    sut = new CreateUserUseCase(userRepository, new CryptHandler())
  })

	it('should be able to create a user', async () => {
		await sut.execute({
			email: 'user@example.com',
			password: 'password'
		})

    const usersLenght = await userRepository.list()
    expect(usersLenght.data).toHaveLength(1)
    expect(usersLenght.data[0].email).toBe('user@example.com')
    expect(usersLenght.data[0].passwordHash).not.toBe('password')
	})
})
