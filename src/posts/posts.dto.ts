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
  files: z
    .object({
      name: z.string().min(1),
      url: z.string().url(),
      type: z.union([z.literal('AUDIO'), z.literal('PDF')]),
      provider: z.union([z.literal('S3'), z.literal('GOOGLE_DRIVE')]),
    })
    .array()
    .max(2),
});

export class PostsDto extends createZodDto(Posts) {}
