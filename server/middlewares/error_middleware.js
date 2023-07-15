import ErrorResponse from "../utils/error_message.js";

const MiddlewareError = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  if (err.name == "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    succes: false,
    error: error.message,
    type: error.type,
  });
};

export default MiddlewareError;
