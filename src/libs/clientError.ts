export class RestApplicationError extends Error {
  constructor(readonly message: string, readonly statusCode: number) {
    super()
  }
}
