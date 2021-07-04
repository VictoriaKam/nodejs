import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from '../users/users.service';
import { ValidateRequest } from './auth.validate-request';

@Module({
  controllers: [AuthController],
  providers: [AuthService, ValidateRequest],
  exports: [ValidateRequest]
})
export class AuthModule {}
