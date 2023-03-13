export class BadRequestError extends Error {
    statusCode;
    type;
    constructor(message) {
      super(`${message}`);
      Error.captureStackTrace(this, BadRequestError);
      this.statusCode = 400;
      this.type = 'Bad Request';
    }
  }
  
  export class AuthenticationError extends Error {
    statusCode;
    type;
    constructor(message) {
      super(`${message}`);
      Error.captureStackTrace(this, AuthenticationError);
      this.statusCode = 401;
      this.type = 'Unauthorized Access';
    }
  }
  
  
  export class NotFoundError extends Error {
    statusCode;
    type;
    constructor(message) {
      super(`${message}`);
      Error.captureStackTrace(this, NotFoundError);
      this.statusCode = 404;
      this.type = 'Not Found';
    }
  }
  
  export class InternalServerError extends Error {
    statusCode;
    type;
    constructor(message) {
      super(`${message}`);
      Error.captureStackTrace(this, InternalServerError);
      this.statusCode = 500;
      this.type = 'Internal Server Error';
    }
  }