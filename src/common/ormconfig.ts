import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import * as dotenv from 'dotenv';

import * as path from 'path';

dotenv.config({
    path: path.join(__dirname, '../../.env')
});

const config: TypeOrmModuleOptions = {
    type: 'postgres',
    name: 'default',
    synchronize: true,
    host: process.env['POSTGRES_HOST'],
    port: +process.env['POSTGRES_PORT'],
    username: process.env['POSTGRES_USER'],
    password: process.env['POSTGRES_PASSWORD'],
    database: process.env['POSTGRES_DB'],
    entities: ['dist/**/entities/*.js'],
    migrations: ['dist/migration/*.js'],
    cli: {
        migrationsDir: 'dist/migration'
    }
};
 export default config;
