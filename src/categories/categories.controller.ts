import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CategoriesService } from './categories.service';
import { CategoryDto } from './category.dto';

@Controller('tenants/:tenantId/categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createCategory(
    @Param('tenantId', new ParseIntPipe()) tenantId: number,
    @Body() category: CategoryDto,
  ) {
    return this.categoriesService.createCategory(category, tenantId);
  }

  @Get()
  async getCategories(@Param('tenantId', new ParseIntPipe()) tenantId: number) {
    console.log(typeof tenantId);
    return this.categoriesService.getCategories(tenantId);
  }

  @Get('/:id')
  async getCategory(@Param('id', new ParseIntPipe()) id: number) {
    return this.categoriesService.getCategory(id);
  }

  @Patch('/:id')
  @UseGuards(JwtAuthGuard)
  async updateCategory(@Param('id') id: number, @Body() category: CategoryDto) {
    return this.categoriesService.updateCategory(id, category);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  async deleteCategory(@Param('id', new ParseIntPipe()) id: number) {
    return this.categoriesService.deleteCategory(id);
  }
}
