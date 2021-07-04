import { Injectable } from '@nestjs/common';
import { getRepository, getConnection } from 'typeorm';
import { hashSync } from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Task } from '../tasks/entities/task.entity';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    const usersRepository = getRepository(User);
    const newUser = usersRepository.create(createUserDto);
    newUser.password = hashSync(createUserDto.password, 10);
    const savedUser = usersRepository.save(newUser);
    return savedUser;
  }

  findAll() {
    const usersRepository = getRepository(User);
    return usersRepository.find()
  }

  findOne(id: string) {
    const usersRepository = getRepository(User);
    return usersRepository.findOne(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const usersRepository = getRepository(User);
    const res = await usersRepository.findOne(id);

    if (!res) {
      return null;
    };

    const updatedTask = await usersRepository.save({
      ...res,
      ...updateUserDto
    });

    return updatedTask;
  }

  async remove(id: string) {
    const usersRepository = getRepository(User);
    const deletionRes = await usersRepository.delete(id);

    getConnection()
      .createQueryBuilder()
      .update(Task)
      .set({ userId: null })
      .where("userId = :id", { id })
      .execute();

    if (!deletionRes.affected) {
      return null;
    }

    return `The user with id ${id} was deleted.`;
  }
}
