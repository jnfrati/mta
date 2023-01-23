import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { prismaErrorFormatter } from './prisma.errors';

@Catch()
export class PrismaFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const error = prismaErrorFormatter(exception as any);

    const ctx = host.switchToHttp();

    const response = ctx.getResponse();

    response.status(error.getStatus()).json(error.getResponse());
  }
}
