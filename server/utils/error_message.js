class ErrorResponse extends Error {
  constructor(message, statusCode, type) {
    super(message);
    this.statusCode = statusCode;
    this.type = type;
  }
}

export default ErrorResponse;
