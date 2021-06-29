import { getConnection, createConnection } from 'typeorm';

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
    } catch(err) {
        console.error(err);
    }
};
