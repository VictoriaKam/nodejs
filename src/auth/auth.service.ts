import { Injectable } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { CreateAuthDto } from './dto/create-auth.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  async login(createAuthDto: CreateAuthDto) {
    const usersRepository = getRepository(User);
    const { login } = createAuthDto;
    const user = await usersRepository.findOne({ where: { login } });

    if (!user) {
      return null;
    }

    const matches = await compare(createAuthDto.password, user.password);

    if (!matches) {
      return null;
    }

    const token = sign(
        { userId: user.id, login: user.login },
          process.env.JWT_SECRET_KEY,
        { expiresIn: 60 * 60 * 24 }
    );

    return { token };
  }
}
