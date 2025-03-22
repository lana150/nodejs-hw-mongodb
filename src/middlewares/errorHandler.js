import { HttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  
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

export default errorHandler



/*export default errorHandler

const errorHandler = (err, req, res, next) => {
  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    data: err.message || 'Unknown error',
  });
  next(err);
};

export default errorHandler;*/


/*const errorHandler = (err, req, res) => {
  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    data: err.message || 'Unknown error',
  });
};

export default errorHandler;*/