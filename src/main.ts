import { NestFactory } from '@nestjs/core';
import { getRepository } from 'typeorm';
import { hashSync } from 'bcrypt';
import { NestExpressApplication } from '@nestjs/platform-express';
import { FastifyAdapter,NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { User } from './users/entities/user.entity';

async function bootstrap() {
  const app = process.env['USE_FASTIFY'] === 'true'
  ? await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true })
  ) : await NestFactory.create<NestExpressApplication>(AppModule);

  await app.listen(process.env['PORT'], '0.0.0.0');

  // create admin user after DB initialization
  const usersRepository = getRepository(User);
  const res = await usersRepository.findOne({ where: { login: "admin" } });
  if (!res) {
    const adminUser = usersRepository.create( { name: "admin", password: hashSync("admin", 10), login: "admin" });
    usersRepository.save(adminUser);
  }
}
bootstrap();
