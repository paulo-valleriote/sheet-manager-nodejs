import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { AuthenticateUserUseCase } from './authenticate'
import { CryptHandler } from '@/lib/crypt-handler'

describe('Authenticate user use case', () => {
  let userRepository: InMemoryUserRepository
  let cryptHandler: CryptHandler
  let sut: AuthenticateUserUseCase

  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    cryptHandler = new CryptHandler()
    sut = new AuthenticateUserUseCase(userRepository, cryptHandler)
  })

  it('should be able to authenticate a user', async () => {
    await userRepository.create({
      email: 'user@example.com',
      passwordHash: await cryptHandler.hash('password')
    })

    const { user } = await sut.execute({
      email: 'user@example.com',
      password: 'password'
    })

    expect(user).toHaveProperty('id')
    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(sut.execute({
      email: 'user@example.com',
      password: 'password'
    })).rejects.toBeInstanceOf(Error)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await userRepository.create({
      email: 'user@example.com',
      passwordHash: await cryptHandler.hash('password')
    })

    await expect(sut.execute({
      email: 'user@example.com',
      password: 'wrong-password'
    })).rejects.toBeInstanceOf(Error)
  })
})
