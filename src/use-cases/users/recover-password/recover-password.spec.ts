import { IUserRole } from '@/domain/entities/enums/user-roles'
import { CryptHandler } from '@/lib/hashing/crypt-handler'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { RecoverPasswordUseCase } from './recover-password'

describe('Recover password use case', () => {
  let userRepository: InMemoryUserRepository
  let cryptHandler: CryptHandler
  let sut: RecoverPasswordUseCase

  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    cryptHandler = new CryptHandler()
    sut = new RecoverPasswordUseCase(userRepository, cryptHandler)
  })

  it('should be able to recover a user password', async () => {
    await userRepository.create({
      email: 'user@example.com',
      passwordHash: await cryptHandler.hash('password'),
      role: IUserRole.USER,
    })

    await sut.execute({
      email: 'user@example.com',
      oldPassword: 'password',
      newPassword: 'new-password',
    })

    const user = await userRepository.getByEmail({ email: 'user@example.com' })

    if (!user.data) {
      throw new Error('User not found')
    }

    expect(user.data).toHaveProperty('id')
    expect(user.data.id).toEqual(expect.any(String))
    expect(await cryptHandler.compare('new-password', user.data.passwordHash)).toBe(true)
    expect(await cryptHandler.compare('password', user.data.passwordHash)).toBe(false)
  })
})
