import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

// class is required for using DTO as a type
export class RegisterDto extends createZodDto(RegisterSchema) {}
