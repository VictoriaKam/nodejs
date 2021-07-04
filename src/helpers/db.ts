import { getConnection, createConnection, getRepository } from 'typeorm';
import { hashSync } from 'bcrypt';

import { User } from '../entities/user.model';

import config = require('../common/ormconfig');

export const connectToDB = async () => {
    let connection;

    try {
        connection = getConnection();
    } catch (err) {
        console.error(err);
    }

    try {
        if (connection) {
            if (!connection.isConnected) await connection.connect();
        } else {
            connection = await createConnection(config);
            await connection.runMigrations();
        }
        console.log('successfully connected')
    } catch(err) {
        console.error(err);
    }
}

export const TryDBConnect = async(cb: () => void) => {
    try {
        await connectToDB();
        cb();

        // create admin user after DB initialization
        const usersRepository = getRepository(User);
        const res = await usersRepository.findOne({ where: { login: "admin" } });
        if (!res) {
            const adminUser = usersRepository.create( { name: "admin", password: hashSync("admin", 10), login: "admin" });
            usersRepository.save(adminUser);
        }
    } catch(err) {
        console.error(err);
    }
};

