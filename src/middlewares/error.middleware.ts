import { Request, Response, NextFunction } from 'express';

export default function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err.stack);
  let statusCode = 500;
  let message = err.message;

  // errors for different routes
  switch (err.name) {
    case 'CastError':
      statusCode = 400;
      message = 'Invalid ID';
      break;
    case 'ValidationError':
      statusCode = 400;
      message = err.message;
      break;
    case 'NotFoundError':
      statusCode = 404;
      message = 'Not found';
      break;
  }

  res.status(statusCode).json({ message });
}
