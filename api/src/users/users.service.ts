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

  async create(
    email: PrismaUser['email'],
    password: PrismaUser['password'],
  ): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        email,
        password,
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...result } = user;
    return result;
  }
}
