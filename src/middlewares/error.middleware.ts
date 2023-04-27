import { Request, Response, NextFunction } from 'express';
import { CastError } from './errors/CastError';
import { UsernameAlreadyExists } from './errors/UsernameAlreadyExists';
import { ValidationError } from './errors/ValidationError';
import { NotFoundError } from './errors/NotFoundError';
import { TransactionFailed } from './errors/TransactionFailed';
import { UserNotFound } from './errors/UserNotFound';
import { MissingRequiredParams } from './errors/MissingRequiredParams';

export default function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err.stack);
  let statusCode = 500;
  let message = err.message;

  // errors
  switch (err.constructor) {
    case CastError:
      statusCode = 400;
      message = err.message;
      break;
    case ValidationError:
      statusCode = 400;
      message = err.message;
      break;
    case NotFoundError:
      statusCode = 404;
      message = err.message;
      break;
    case UsernameAlreadyExists:
      statusCode = 409;
      message = err.message;
      break;
    case TransactionFailed:
      statusCode = 409;
      message = err.message;
    case UserNotFound:
      statusCode = 404;
      message = err.message;
    case MissingRequiredParams:
      statusCode = 400;
      message = err.message;
  }

  res.status(statusCode).json({ message });
}
