import createError from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const isHttpError = err instanceof createError.HttpError;

  res.status(status).json({
    status,
    message: isHttpError ? err.message : 'Something went wrong',
    
  });
};

export default errorHandler;


/*import createError  from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  // Якщо err є об'єктом помилки createError
  if (err.status) {
    res.status(err.status).json({
      status: err.status,
      message: err.message,
    });
    return;
  }

  // Якщо це інша помилка (наприклад, помилка сервера)
  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    data: err.message,
  });
};

export default errorHandler;*/


/*import { HttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  // Перевірка, чи отримали ми помилку від createHttpError
  if (err instanceof HttpError) {
    res.status(err.status).json({
      status: err.status,
      message: err.name,
      data: err,
    });
    next()
    return;
  }

  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    data: err.message,
  });
};

export default errorHandler*/