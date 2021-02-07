import { HttpResponse } from '../ports/http-response'

export const created = (data: any): HttpResponse => ({
  statusCode: 201,
  body: data
})
