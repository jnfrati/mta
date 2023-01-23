import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const Tenant = z.object({
  name: z.string().min(1),
  slug: z.string().min(1).optional(),
});

// class is required for using DTO as a type
export class TenantDto extends createZodDto(Tenant) {}
