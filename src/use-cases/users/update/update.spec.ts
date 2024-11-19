import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { CreateUserUseCase } from '../create/create'
import { UpdateUserUseCase } from './update'
import { CryptHandler } from '@/lib/crypt-handler'
import { ResourceNotFoundError } from '../../errors/resource-not-found-error'

describe('Update user use case', () => {
  let userRepository: InMemoryUserRepository
  let createUserUseCase: CreateUserUseCase
  let sut: UpdateUserUseCase

  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    createUserUseCase = new CreateUserUseCase(userRepository, new CryptHandler())
    sut = new UpdateUserUseCase(userRepository)
  })

  it('should be able to update a user', async () => {
    await createUserUseCase.execute({
      email: 'user1@example.com',
      password: 'password',
    })

    const usersLenght = await userRepository.list()

    await sut.execute({
      userId: usersLenght.data[0].id,
      email: 'user2@example.com',
    })

    const users = await userRepository.list()
    expect(users.data).toHaveLength(1)
    expect(users.data[0].email).toBe('user2@example.com')
  })

  it('should not be able to update a non existing user', async () => {
    await expect(
      sut.execute({
        userId: 'invalid-user-id',
        email: 'user2@example.com',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
