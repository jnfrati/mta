import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { hashConstants } from '../constants';

@Injectable()
export class HashService {
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, hashConstants.saltRounds);
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
