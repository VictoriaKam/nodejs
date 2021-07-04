import { getRepository } from 'typeorm';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { User } from '../../entities/user.model';

const loginService = async (login: string, password: string): Promise<string> => {
    const usersRepository = getRepository(User);
    const user = await usersRepository.findOne({ where: { login } });

    if (!user) {
      throw new Error('User not found');
    }

    const matches = await compare(password, user.password);
    if (!matches) {
      throw new Error('Passwords do not match');
    }

    const token = sign(
        { userId: user.id, login: user.login },
          process.env.JWT_SECRET_KEY,
        { expiresIn: 60 * 60 * 24 }
    );

    return token;
}

export = loginService;
