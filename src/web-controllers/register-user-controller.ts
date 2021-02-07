import { UserData } from '../entities/user-data'
import { RegisterUserOnMalingList } from '../usecases/register-user-on-mailing-list/register-user-on-mailling-list'
import { HttpRequest, HttpResponse } from './ports'
import { created } from './util'

export class RegisterUserController {
    private readonly usecase: RegisterUserOnMalingList

    constructor (usecase: RegisterUserOnMalingList) {
      this.usecase = usecase
    }

    public async handle (request: HttpRequest): Promise<HttpResponse> {
      const userData: UserData = request.body
      const response = await this.usecase.registerUserOnMalingList(userData)

      if (response.isRight()) {
        return created(response.value)
      }
    }
}
