import { Injectable } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  async create(boardId: string, createTaskDto: CreateTaskDto) {
    const tasksRepository = getRepository(Task);
    const newTask = tasksRepository.create(createTaskDto);
    newTask.boardId = boardId;
    const savedTask = await tasksRepository.save(newTask);
    return savedTask;
  }

  async findAll(boardId: string) {
    const tasksRepository = getRepository(Task);
    const tasks = await tasksRepository.find({ where: { boardId } })
    if (!tasks) {
      return null;
    }

    return tasks;
  }

  findOne(boardId: string, id: string) {
    const tasksRepository = getRepository(Task);
    const task = tasksRepository.findOne({ where: { boardId, id } });

    if (!task) {
      return null;
    }

    return task;
  }

  async update(boardId: string, id: string, updateTaskDto: UpdateTaskDto) {
    const tasksRepository = getRepository(Task);
    const res = await tasksRepository.findOne({ where: { boardId, id } });

    if (!res) {
      return null;
    }

    const newTask = updateTaskDto;
    newTask.boardId = boardId;

    const updatedTask = await tasksRepository.save({
      ...res,
      ...newTask
    });

    return updatedTask;
  }

  async remove(id: string) {
    const tasksRepository = getRepository(Task);
    const deletionRes = await tasksRepository.delete(id);

    if (!deletionRes.affected) {
      return null;
    }

    return `The task with id ${id} was deleted.`;
  }
}
