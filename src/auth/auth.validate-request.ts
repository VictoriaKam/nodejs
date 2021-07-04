import { verify, VerifyErrors } from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ValidateRequest {
  validate(req: { headers: { authorization: string; }; }) {
    let result = false;
    const {authorization} = req.headers;
    if (authorization) {
        const token = authorization.split(" ")[1];
        if (token) {
            verify(token, process.env.JWT_SECRET_KEY, async (err: VerifyErrors | null, decoded: { userId: string; }) => {
                if (decoded) {
                    const usersRepository = getRepository(User);
                    const id = decoded.userId;
                    const user = usersRepository.findOne(id);
                    if (user) result = true;
                }
            });
        }
    }
    return result;
  }
}
