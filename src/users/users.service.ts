import { Injectable } from '@nestjs/common';
import { User as PrismaUser } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

export type User = Omit<PrismaUser, 'password'>;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(email: User['email']): Promise<PrismaUser | null> {
    return this.prisma.user.findFirst({
      where: {
        email: email,
      },
    });
  }
}
