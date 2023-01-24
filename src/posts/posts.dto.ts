import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const Posts = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  published: z.boolean().optional(),
  authors: z
    .object({
      email: z.string().email(),
      name: z.string().min(1),
    })
    .array(),
  categoryId: z.number().min(1).optional(),
});

export class PostsDto extends createZodDto(Posts) {}
