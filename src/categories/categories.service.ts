import { Injectable } from '@nestjs/common';
import slugify from 'slugify';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoryDto } from './category.dto';

@Injectable()
export class CategoriesService {
  constructor(private prismaService: PrismaService) {}

  async createCategory(data: CategoryDto, tenantId: number) {
    const slug = slugify(data.name, {
      lower: true,
    });

    const category = await this.prismaService.category.create({
      data: {
        name: data.name,
        slug,
        tenant: {
          connect: {
            id: tenantId,
          },
        },
      },
    });

    return category;
  }

  async getCategories(tenantId: number) {
    const categories = await this.prismaService.category.findMany({
      where: {
        tenantId,
      },
    });

    return categories;
  }

  async getCategory(id: number) {
    const category = await this.prismaService.category.findUnique({
      where: {
        id,
      },
    });
    return category;
  }

  async updateCategory(id: number, data: CategoryDto) {
    const category = await this.prismaService.category.update({
      where: {
        id,
      },
      data: {
        name: data.name,
      },
    });
    return category;
  }

  async deleteCategory(id: number) {
    const category = await this.prismaService.category.delete({
      where: {
        id,
      },
    });
    return category;
  }
}
