import { CryptHandler } from '@/lib/hashing/crypt-handler'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { UserAlreadyExistsError } from '../../_errors/extended/user/user-already-exists-error'
import { CreateUserUseCase } from './create'

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
      password: 'password',
    })

    const usersLenght = await userRepository.list()
    expect(usersLenght.data).toHaveLength(1)
    expect(usersLenght.data[0].email).toBe('user@example.com')
    expect(usersLenght.data[0].passwordHash).not.toBe('password')
  })

  it('should not be able to create a user with same email twice', async () => {
    await sut.execute({
      email: 'user@example.com',
      password: 'password',
    })

    await expect(
      sut.execute({
        email: 'user@example.com',
        password: 'password',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
