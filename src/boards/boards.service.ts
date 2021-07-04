import { Injectable } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';
import { Columns } from './entities/columns.entity';
import { Task } from '../tasks/entities/task.entity';

@Injectable()
export class BoardsService {
  async create(createBoardDto: CreateBoardDto) {
    const columnsRepository = getRepository(Columns);
    const newColumns = columnsRepository.create(createBoardDto.columns);
    await columnsRepository.save(newColumns);

    const boardsRepository = getRepository(Board);
    const newBoard = boardsRepository.create(createBoardDto);
    newBoard.columns = newColumns;
    const savedBoard = await boardsRepository.save(newBoard);

    return savedBoard;
  }

  findAll() {
    const boardsRepository = getRepository(Board);
    return boardsRepository.find({ relations: ["columns"] })
  }

  findOne(id: string) {
    const boardsRepository = getRepository(Board);
    return  boardsRepository.findOne(id, { relations: ["columns"] });
  }

  async update(id: string, updateBoardDto: UpdateBoardDto) {
    const boardsRepository = getRepository(Board);
    const res = await boardsRepository.findOne(id, { relations: ["columns"] });

    if (!res) {
      return null;
    }

    const columnsRepository = getRepository(Columns);
    const updatedColumns = await columnsRepository.save([
      ...updateBoardDto.columns
    ]);

    const newBoard = updateBoardDto;
    newBoard.columns = updatedColumns;

    const updatedBoard = await boardsRepository.save({
      ...res,
      ...newBoard
    });

    return updatedBoard;
  }

  async remove(id: string) {
    const boardsRepository = getRepository(Board);
    const res = await boardsRepository.findOne(id, { relations: ["columns"] });

    if (res) {
      const columnsRepository = getRepository(Columns);
      await columnsRepository.remove(res.columns);

      const deletionRes = await boardsRepository.delete(id);

      const tasksRepository = getRepository(Task);
      const tasks = await tasksRepository.find({ where: { boardId: id } });
      await tasksRepository.remove(tasks);

      if (!deletionRes.affected) {
        return null;
      }
      return `The board with id ${id} was deleted.`;
    }
    return null;
  }
}
