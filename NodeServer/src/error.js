class ClientError extends Error {

}

class UnauthorizedError extends ClientError {
  constructor(...params) {
    super(...params);
    this.name = 'UnauthorizedError';
    this.statusCode = 400;
  }

  toString() {
    return 'Please login to continue.';
  }
}

class BadRequestError extends ClientError {
  constructor(...params) {
    super(...params);
    this.name = 'BadRequestError';
    this.statusCode = 400;
  }

  toString() {
    return this.message.length ? this.message : 'Bad request.';
  }
}

class ForbiddenError extends ClientError {
  constructor(...params) {
    super(...params);
    this.name = 'ForbiddenError';
    this.statusCode = 403;

  }

  toString() {
    return 'Insufficient permission.';
  }
}

class NotFoundError extends ClientError {
  constructor(...params) {
    super(...params);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }

  toString() {
    return `${this.message} not found`;
  }
}

module.exports = {
  ClientError,
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
};