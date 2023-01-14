import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { ZodValidationPipe } from 'nestjs-zod';

@Module({
  imports: [AuthModule, UsersModule, PrismaModule],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    {
      provide: 'APP_PIPE',
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
