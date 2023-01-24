import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

const errorsMap = {
  P2002: {
    message: 'A record with this {model} already exists',
    code: 'ALREADY_EXISTS',
  },
};

export const prismaErrorFormatter = (
  error: Prisma.PrismaClientKnownRequestError,
) => {
  if (!(error instanceof Prisma.PrismaClientKnownRequestError)) {
    console.log(error);
    return error;
  }

  const { code, meta } = error;

  if (code === 'P2002') {
    const { target } = meta;
    const message = errorsMap[code].message.replace('{model}', target[0]);

    return new ConflictException(message);
  }

  return new InternalServerErrorException();
};
