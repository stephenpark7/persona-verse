export class Exception extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class InternalServerError extends Exception {
  constructor(
    message = 'Internal server error occurred while processing request',
  ) {
    super(message);
  }
}
