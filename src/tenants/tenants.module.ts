import { Module } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { TenantsController } from './tenants.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [TenantsService],
  controllers: [TenantsController],
})
export class TenantsModule {}
