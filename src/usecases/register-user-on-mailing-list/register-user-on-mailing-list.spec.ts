import { UserData } from './entities/user-data'
import { UserRepository } from './ports/user-repository'
import { InMemoryUserRepository } from './repository/in-memory-user-repository'
import { RegisterUserOnMalingList } from './register-user-on-mailling-list'
import { left } from './shared/either'
import { InvalidEmailError } from './entities/errors/invalid-email-error'
import { InvalidNameError } from './entities/errors/invalid-name-error'

describe('Register user on maling list use case', () => {
  test('should add user with complete data to mailing list', async () => {
    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const usecase: RegisterUserOnMalingList = new RegisterUserOnMalingList(repo)
    const name = 'any_name'
    const email = 'any@email.com'
    const response = await usecase.registerUserOnMalingList({ name, email })
    const user = repo.findUserByEmail('any@email.com')
    expect((await user).name).toBe('any_name')
    expect(response.value.name).toBe('any_name')
  })

  test('should not add user with invalid email to mailing list', async () => {
    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const usecase: RegisterUserOnMalingList = new RegisterUserOnMalingList(repo)
    const name = 'any_name'
    const invalidemail = 'invalid_email'
    const response = await usecase.registerUserOnMalingList({ name: name, email: invalidemail })
    const user = await repo.findUserByEmail(invalidemail)
    expect(user).toBeNull()
    expect(response).toEqual(left(new InvalidEmailError()))
  })

  test('should not add user with invalid name to mailing list', async () => {
    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const usecase: RegisterUserOnMalingList = new RegisterUserOnMalingList(repo)
    const invalidname = ''
    const email = 'any@mail.com'
    const response = await usecase.registerUserOnMalingList({ name: invalidname, email: email })
    const user = await repo.findUserByEmail(email)
    expect(user).toBeNull()
    expect(response).toEqual(left(new InvalidNameError()))
  })
})
