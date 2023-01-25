import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaFilter } from './prisma/prisma.filter';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: false,
  });

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  app.useGlobalFilters(new PrismaFilter());

  await app.listen(8500, 'localhost');
}
bootstrap();
