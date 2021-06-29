import * as usersRepo from './user.memory.repository';
import { User } from '../../entities/user.model'

const getAll = (): Promise<Array<User>> => usersRepo.getAll();

const get = (id: string): Promise<User> => usersRepo.get(id);

const create = (user: User): Promise<User> => usersRepo.create(user);

const update = (id: string, user: User): Promise<User> => usersRepo.update(id, user);

const remove = (id: string): Promise<string> => usersRepo.remove(id);

const _ = {
    getAll,
    get,
    create,
    update,
    remove
  }

  export = _;
