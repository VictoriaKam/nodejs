import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, UseFilters, ParseUUIDPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserNotFoundError } from './errors/user-not-found.error';
import { User } from './entities/user.entity';
import { AuthGuard } from '../auth/auth.guard';
import { ErrorFilter } from '../exception.filter';

@UseGuards(AuthGuard)
@UseFilters(new ErrorFilter())
@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return User.toResponse(user);
  }

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    return users.map(User.toResponse)
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = await this.usersService.findOne(id);

    if (user) {
      return User.toResponse(user);
    }

    throw new UserNotFoundError();
  }

  @Put(':id')
  async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.update(id, updateUserDto);

    if (user) {
      return User.toResponse(user);
    }

    throw new UserNotFoundError();
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usersService.remove(id);
  }
}
