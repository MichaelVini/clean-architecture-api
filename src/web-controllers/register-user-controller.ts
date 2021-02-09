import { UserData } from '../entities/user-data'
import { RegisterUserOnMalingList } from '../usecases/register-user-on-mailing-list/register-user-on-mailling-list'
import { MissingParamError } from './errors/missing-param-error'
import { HttpRequest, HttpResponse } from './ports'
import { badRequest, created } from './util/http-helper'

export class RegisterUserController {
    private readonly usecase: RegisterUserOnMalingList

    constructor (usecase: RegisterUserOnMalingList) {
      this.usecase = usecase
    }

    public async handle (request: HttpRequest): Promise<HttpResponse> {
      if (!(request.body.name) || !(request.body.email)) {
        let missingParam = !(request.body.name) ? 'name ' : ''
        missingParam += !(request.body.email) ? 'email' : ''
        return badRequest(new MissingParamError(missingParam.trim()))
      }

      const userData: UserData = request.body
      const response = await this.usecase.registerUserOnMalingList(userData)

      if (response.isLeft()) {
        return badRequest(response.value)
      }

      if (response.isRight()) {
        return created(response.value)
      }
    }
}
