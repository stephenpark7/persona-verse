export class Exception extends Error {
  protected statusCode = 500;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
  }

  public getStatusCode(): number {
    return this.statusCode;
  }
}

export class InternalServerError extends Exception {
  constructor(message = 'Internal server error.') {
    super(message, 500);
  }
}

export class AuthenticationError extends Exception {
  constructor(message = 'Unauthorized access.') {
    super(message, 401);
  }
}

export class TokenExpiredError extends Error {
  statusCode = 403;

  constructor(message = 'Token expired.') {
    super(message);
  }
}
