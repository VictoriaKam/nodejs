import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, UseFilters, ParseUUIDPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskNotFoundError } from './errors/task-not-found.error';
import { AuthGuard } from '../auth/auth.guard';
import { ErrorFilter } from '../exception.filter';

@UseGuards(AuthGuard)
@UseFilters(new ErrorFilter())
@Controller('boards/:boardId/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Param('boardId') boardId: string, @Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(boardId, createTaskDto);
  }

  @Get()
  findAll(@Param('boardId') boardId: string) {
    const tasks = this.tasksService.findAll(boardId);

    if (tasks) {
      return tasks;
    }

    throw new TaskNotFoundError();
  }

  @Get(':id')
  async findOne(@Param('boardId') boardId: string, @Param('id', new ParseUUIDPipe()) id: string) {
    const task = await this.tasksService.findOne(boardId, id);

    if (task) {
      return task;
    }

    throw new TaskNotFoundError();
  }

  @Put(':id')
  async update(@Param('boardId') boardId: string, @Param('id', new ParseUUIDPipe()) id: string, @Body() updateTaskDto: UpdateTaskDto) {
    const task = await this.tasksService.update(boardId, id, updateTaskDto);

    if (task) {
      return task;
    }

    throw new TaskNotFoundError();
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.tasksService.remove(id);
  }
}
