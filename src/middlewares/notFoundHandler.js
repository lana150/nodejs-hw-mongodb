import  { HttpError }   from 'http-errors';

const notFoundHandler = (req, res, next) => {
  next({ HttpError }(404, 'Route not found'));
};

export default notFoundHandler;