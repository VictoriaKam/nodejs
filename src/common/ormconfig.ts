import { ConnectionOptions } from 'typeorm';

import * as dotenv from 'dotenv';

import * as path from 'path';

dotenv.config({
    path: path.join(__dirname, '../../env')
});

const config = {
    type: 'postgres',
    name: 'default',
    synchronize: false,
    host: process.env['POSTGRES_HOST'],
    port: process.env['POSTGRES_PORT'],
    username: process.env['POSTGRES_USER'],
    password: process.env['POSTGRES_PASSWORD'],
    database: process.env['POSTGRES_DB'],
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectionInterval: 1000,
    entities: ['src/entities/**/*.ts'],
    migrations: ['src/migration/*.ts'],
    cli: {
        migrationsDir: 'src/migration'
    }
};

export = config as ConnectionOptions;
