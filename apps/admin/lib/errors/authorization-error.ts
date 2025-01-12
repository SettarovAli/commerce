export class AuthorizationError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number = 401) {
    super(message);
    this.name = 'AuthorizationError';
    this.statusCode = statusCode;
  }
}
