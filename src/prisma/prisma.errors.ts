import {
  ConflictException,
  GoneException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

const errorsMap = {
  P2002: {
    message: 'A record with this {model} already exists',
    code: 'ALREADY_EXISTS',
  },
  P2025: {
    message: 'Record not found',
    code: 'NOT_FOUND',
  },
};

export const prismaErrorFormatter = (
  error: Prisma.PrismaClientKnownRequestError,
) => {
  if (!(error instanceof Prisma.PrismaClientKnownRequestError)) {
    return error;
  }

  const { code, meta } = error;

  switch (code) {
    case 'P2002':
      const { target } = meta;
      const message = errorsMap[code].message.replace('{model}', target[0]);

      return new ConflictException(message);
    case 'P2025':
      return new GoneException(errorsMap[code].message);
    default:
      return new InternalServerErrorException();
  }
};
