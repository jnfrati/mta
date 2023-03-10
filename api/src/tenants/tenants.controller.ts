import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TenantDto } from './tenant.dto';
import { TenantsService } from './tenants.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthUser } from 'src/auth/auth.decorator';
import { User } from 'src/users/users.service';

@Controller('tenants')
export class TenantsController {
  constructor(private tenantsService: TenantsService) {}

  @Post('new')
  @UseGuards(JwtAuthGuard)
  async createTenant(@Body() body: TenantDto, @AuthUser() user: User) {
    return this.tenantsService.createTenant(body.name, user.id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateTenant(
    @Body() body: TenantDto,
    @Param('id', new ParseIntPipe()) id: number,
  ) {
    return this.tenantsService.updateTenant(id, body.name, body.slug);
  }

  @Get()
  async getTenants() {
    return this.tenantsService.getTenants();
  }

  @Get('my')
  @UseGuards(JwtAuthGuard)
  async getMyTenants(@AuthUser() user: User) {
    return this.tenantsService.getTenants(user.id);
  }

  @Get(':slug')
  async getTenantBySlug(@Param('slug') id: string) {
    return this.tenantsService.getTenant(id);
  }
}
