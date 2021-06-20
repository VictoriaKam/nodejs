import { getRepository, getConnection } from 'typeorm';

import { User } from '../../entities/user.model';
import { Task } from '../../entities/task.model'

const getAll = async (): Promise<Array<User>> => {
  const usersRepository = getRepository(User);
  return usersRepository.find()
};

const get = async (id: string): Promise<User | never> => {
  const usersRepository = getRepository(User);
  const res = await usersRepository.findOne(id);

  if (!res) {
    throw new Error(`The user with id ${id} was not found.`);
  }

  return res;
};

const create = async (user: User): Promise<User> => {
  const usersRepository = getRepository(User);
  const newUser = usersRepository.create(user);
  const savedUser = usersRepository.save(newUser);
  return savedUser;
}

const update = async (id: string, user: User): Promise<User> => {
  const usersRepository = getRepository(User);
  const res = await usersRepository.findOne(id);

  if (!res) {
    throw new Error(`The user with id ${id} was not found.`);
  }

  const updatedTask = await usersRepository.save({
    ...res,
    ...user
  });

  return updatedTask;
}

const remove = async (id: string): Promise<string> => {
  const usersRepository = getRepository(User);
  const deletionRes = await usersRepository.delete(id);

  await getConnection()
    .createQueryBuilder()
    .update(Task)
    .set({ userId: null })
    .where("userId = :id", { id })
    .execute();

  if (!deletionRes.affected) {
    throw new Error(`The user with id ${id} was not found.`);
  }

  return `The user with id ${id} was deleted.`;
}

const _ = {
  getAll,
  get,
  create,
  update,
  remove
}

export = _;
