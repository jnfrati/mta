import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaFilter } from './prisma/prisma.filter';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    allowedHeaders: ['content-type'],
    origin: '*',
  });
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  app.useGlobalFilters(new PrismaFilter());

  await app.listen(8500, '0.0.0.0');
}
bootstrap();
