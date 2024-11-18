import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { DeleteUserUseCase } from './delete'
import { CreateUserUseCase } from './create'
import { CryptHandler } from '@/lib/crypt-handler'
describe('Delete user use case', () => {
  let userRepository: InMemoryUserRepository
  let createUserUseCase: CreateUserUseCase
  let sut: DeleteUserUseCase

  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    createUserUseCase = new CreateUserUseCase(userRepository, new CryptHandler())
    sut = new DeleteUserUseCase(userRepository)
  })

	it('should be able to delete a user', async () => {
		await createUserUseCase.execute({
			email: 'user@example.com',
			password: 'password'
		})

    const usersLengthBeforeDelete = await userRepository.list()
    const createdUserId = usersLengthBeforeDelete.data[0].id

    await sut.execute({
      userId: createdUserId
    })

    const usersLengthAfterDelete = await userRepository.list()
    expect(usersLengthAfterDelete.data).toHaveLength(0)
	})

  it('should not be able to delete a user that does not exist', async () => {
    await expect(sut.execute({
      userId: 'user-1'
    })).rejects.toBeInstanceOf(Error)
  })

  it('should not be able to delete a user that does not exist', async () => {
    await expect(sut.execute({
      userId: 'user-2'
    })).rejects.toBeInstanceOf(Error)
  })

  it('should not be able to delete a user that does not belong to the user', async () => {
    await expect(sut.execute({
      userId: 'user-2'
    })).rejects.toBeInstanceOf(Error)
  })
})
