import { Controller, Post, Body, UseFilters } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { CanNotLoginError } from './errors/can-not-login.error';
import { ErrorFilter } from '../exception.filter';

@UseFilters(new ErrorFilter())
@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async create(@Body() createAuthDto: CreateAuthDto) {
    const token = await this.authService.login(createAuthDto);

    if (token) {
      return token;
    }

    throw new CanNotLoginError();
  }
}
