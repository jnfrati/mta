import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import slugify from 'slugify';

@Injectable()
export class TenantsService {
  constructor(private prismaService: PrismaService) {}

  async createTenant(name: string, ownerId: number) {
    const slug = slugify(name, {
      lower: true,
    });

    const tenant = await this.prismaService.tenant.create({
      data: {
        name,
        slug,
        owner: {
          connect: {
            id: ownerId,
          },
        },
      },
    });

    return tenant;
  }

  async getTenants(ownerId?: number) {
    if (ownerId) {
      const tenants = await this.prismaService.tenant.findMany({
        where: {
          ownerId,
        },
      });

      return tenants;
    }

    const tenants = await this.prismaService.tenant.findMany();

    return tenants.map((tenant) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { ownerId, ...rest } = tenant;
      return rest;
    });
  }

  async getTenant(slug: string) {
    const tenant = await this.prismaService.tenant.findUnique({
      where: {
        slug,
      },
      include: {
        categories: {
          take: 3,
        },
        posts: {
          take: 3,
        },
        _count: {
          select: {
            categories: true,
            posts: true,
          },
        },
      },
    });
    return tenant;
  }

  async updateTenant(id: number, name: string, slug?: string) {
    const newSlug =
      slug ||
      slugify(name, {
        lower: true,
      });
    const tenant = await this.prismaService.tenant.update({
      where: {
        id,
      },
      data: {
        name,
        slug: newSlug,
      },
    });

    return tenant;
  }

  async deleteTenant(id: number) {
    const tenant = await this.prismaService.tenant.delete({
      where: {
        id,
      },
    });

    return tenant;
  }
}
