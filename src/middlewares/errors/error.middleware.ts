import { Request, Response, NextFunction } from 'express';
import { CastError } from './CastError';
import { EmailAlreadyExists } from './EmailAlreadyExists';
import { ValidationError } from './ValidationError';
import { NotFoundError } from './NotFoundError';
import { TransactionFailed } from './TransactionFailed';
import { UserNotFound } from './UserNotFound';
import { MissingRequiredParams } from './MissingRequiredParams';
import { InvalidEmail } from './InvalidEmail';
import { WrongCredentials } from './WrongCredentials';
import { UserNotAuthenticated } from './UserNotAuthenticated';
import { PayloadTooLargeError } from './PayloadTooLargeError';

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
    case EmailAlreadyExists:
      statusCode = 409;
      message = err.message;
      break;
    case TransactionFailed:
      statusCode = 409;
      message = err.message;
      break;
    case UserNotFound:
      statusCode = 404;
      message = err.message;
      break;
    case MissingRequiredParams:
      statusCode = 400;
      message = err.message;
      break;
    case InvalidEmail:
      statusCode = 400;
      message = err.message;
      break;
    case WrongCredentials:
      statusCode = 401;
      message = err.message;
      break;
    case UserNotAuthenticated:
      statusCode = 401;
      message = err.message;
      break;
    case PayloadTooLargeError:
      statusCode = 413;
      message = err.message;
  }

  res.status(statusCode).json({ message });
}
