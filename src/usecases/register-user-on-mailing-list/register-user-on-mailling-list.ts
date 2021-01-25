import { InvalidEmailError } from './entities/errors/invalid-email-error'
import { InvalidNameError } from './entities/errors/invalid-name-error'
import { UserRepository } from './ports/user-repository'
import { Either, left, right } from './shared/either'
import { UserData } from './entities/user-data'
import { User } from './entities/user'

export class RegisterUserOnMalingList {
    private readonly userRepo: UserRepository

    constructor (userRepo: UserRepository) {
      this.userRepo = userRepo
    }

    public async registerUserOnMalingList (request: UserData):
        Promise<Either<InvalidNameError | InvalidEmailError, UserData>> {
      const userOrError: Either<InvalidNameError | InvalidEmailError, User> = User.create(request)
      if (userOrError.isLeft()) {
        return left(userOrError.value)
      }

      if (!(await this.userRepo.exists(request))) {
        await this.userRepo.add(request)
      }
      return right(request)
    }
}
