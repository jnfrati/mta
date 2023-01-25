import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostsDto } from './posts.dto';

@Injectable()
export class PostsService {
  constructor(private prismaService: PrismaService) {}

  async createPost(data: PostsDto, tenantId: number) {
    const post = await this.prismaService.post.create({
      data: {
        title: data.title,
        content: data.content,

        published: data.published,
        category: {
          connect: {
            id: data.categoryId,
          },
        },

        tenant: {
          connect: {
            id: tenantId,
          },
        },

        authors: {
          connectOrCreate: data.authors.map((author) => ({
            where: {
              email: author.email,
            },
            create: {
              email: author.email,
              name: author.name,
            },
          })),
        },
        files: {
          create: data.files.map((file) => ({
            name: file.name,
            url: file.url,
            type: file.type,
            provider: file.provider,
          })),
        },
      },
      include: {
        authors: true,
        files: true,
      },
    });

    return post;
  }

  async getPosts(tenantId: number, categoryId?: number) {
    if (categoryId) {
      return await this.prismaService.post.findMany({
        where: {
          category: {
            id: categoryId,
          },
          tenant: {
            id: tenantId,
          },
        },
        include: {
          authors: true,
        },
      });
    }

    return this.prismaService.post.findMany({
      where: {
        tenant: {
          id: tenantId,
        },
      },
      include: {
        authors: true,
      },
    });
  }

  async getPost(id: number) {
    const post = await this.prismaService.post.findUnique({
      where: {
        id,
      },
      include: {
        authors: true,
        files: true,
      },
    });
    return post;
  }

  async updatePost(id: number, data: PostsDto) {
    const oldPost = await this.prismaService.post.findUnique({
      where: {
        id,
      },
      include: {
        authors: true,
        files: true,
      },
    });

    const oldAuthors = oldPost.authors.map((author) => author.email);
    const oldFiles = oldPost.files.map((file) => file.id);

    const removedAuthors = oldAuthors.filter(
      (author) => !data.authors.map((author) => author.email).includes(author),
    );

    const post = await this.prismaService.post.update({
      where: {
        id,
      },
      data: {
        title: data.title,
        content: data.content,
        published: data.published,
        category: {
          connect: {
            id: data.categoryId,
          },
        },
        authors: {
          connectOrCreate: data.authors.map((author) => ({
            where: {
              email: author.email,
            },
            create: {
              email: author.email,
              name: author.name,
            },
          })),
          disconnect: removedAuthors.map((email) => ({ email })),
        },
        files: {
          create: data.files.map((file) => ({
            name: file.name,
            url: file.url,
            type: file.type,
            provider: file.provider,
          })),
          delete: oldFiles.map((id) => ({ id })),
        },
      },
      include: {
        authors: true,
      },
    });
    return post;
  }

  async deletePost(id: number) {
    const post = await this.prismaService.post.delete({
      where: {
        id,
      },
    });
    return post;
  }
}
