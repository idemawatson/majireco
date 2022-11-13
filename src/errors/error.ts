import { BaseError } from 'make-error-cause'
export class ValidationError extends BaseError {}
export class NotFoundError extends BaseError {}
export class NotAuthorizedError extends BaseError {}
export class InvalidDataError extends BaseError {}

export class GameValidationError extends ValidationError {}
export class GameNotFoundError extends NotFoundError {}
export class GameInvalidDataError extends InvalidDataError {}
