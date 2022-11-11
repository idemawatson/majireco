import { BaseError } from 'make-error-cause'
export class ValidationError extends BaseError {}
export class NotFoundError extends BaseError {}
export class NotAuthorizedError extends BaseError {}
