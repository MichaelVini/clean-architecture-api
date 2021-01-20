import { UserData } from './user-data'
import { Either, left } from '../shared/either'
import { InvalidEmailError } from './errors/invalid-email-error'
import { Email } from './email'
import { InvalidNameError } from './errors/invalid-name-error'
import { Name } from './name'

export class User {
  static create (UserData: UserData): Either<InvalidNameError | InvalidEmailError, User> {
    const emailOrError = Email.create(UserData.email)
    const nameOrError = Name.create(UserData.name)

    if (nameOrError.isLeft()) {
      return left(new InvalidNameError())
    }

    if (emailOrError.isLeft()) {
      return left(new InvalidEmailError())
    }
  }
}
