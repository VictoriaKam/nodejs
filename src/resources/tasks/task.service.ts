import * as tasksRepo from './task.memory.repository';

import { Task } from '../../entities/task.model'

const getAll = (boardId: string): Promise<Array<Task>> => tasksRepo.getAll(boardId);

const get = (boardId: string, id: string): Promise<Task> => tasksRepo.get(boardId, id);

const create = (boardId: string, task: Task): Promise<Task> => tasksRepo.create(boardId, task);

const update = (boardId: string, id: string, task: Task): Promise<Task> => tasksRepo.update(boardId, id, task);

const remove = (boardId: string, id: string): Promise<string> => tasksRepo.remove(boardId, id);

const _ = {
    getAll,
    get,
    create,
    update,
    remove
  }

  export = _;
