import { verify } from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { Request, Response, NextFunction } from 'express';
import { User } from '../entities/user.model';

export const validateSession = (req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'OPTIONS') {
        next();   // allowing options as a method for request
    }
    const {authorization} = req.headers;
    if (authorization) {
        const token = authorization.split(" ")[1];
        if (token) {
            verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
                if (decoded) {
                    const usersRepository = getRepository(User);
                    const id = decoded.userId;
                    usersRepository.findOne(id).then(user => {
                        if (user) console.log(user)
                        next()
                    })
                } else res.status(401).send({ error: "Unauthorized" });
            });
        } else res.status(401).send({ error: "Unauthorized" });
    } else res.status(401).send({ error: "Unauthorized" });
}
