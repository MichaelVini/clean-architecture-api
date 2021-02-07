import { UserData } from '../../src/entities/user-data'
import { UserRepository } from '../../src/usecases/register-user-on-mailing-list/ports/user-repository'
import { RegisterUserOnMalingList } from '../../src/usecases/register-user-on-mailing-list/register-user-on-mailling-list'
import { HttpRequest } from '../../src/web-controllers/ports/http-request'
import { HttpResponse } from '../../src/web-controllers/ports/http-response'
import { RegisterUserController } from '../../src/web-controllers/register-user-controller'
import { InMemoryUserRepository } from '../usecase/register-user-on-mailing-list/repository/in-memory-user-repository'

describe('Register user web controller', () => {
  test('should return status code 201 when request contains valid user data', async () => {
    const request: HttpRequest = {
      body: {
        name: 'Any name',
        email: 'any@mail.com'
      }
    }
    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const usecase: RegisterUserOnMalingList = new RegisterUserOnMalingList(repo)
    const controller: RegisterUserController = new RegisterUserController(usecase)
    const response: HttpResponse = await controller.handle(request)
    expect(response.statusCode).toEqual(201)
  })
})
