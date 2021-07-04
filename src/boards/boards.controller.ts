import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, UseFilters, ParseUUIDPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { BoardNotFoundError } from './errors/board-not-found.error';
import { AuthGuard } from '../auth/auth.guard';
import { ErrorFilter } from '../exception.filter';

@UseGuards(AuthGuard)
@UseFilters(new ErrorFilter())
@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  create(@Body() createBoardDto: CreateBoardDto) {
    return this.boardsService.create(createBoardDto);
  }

  @Get()
  findAll() {
    return  this.boardsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const board = await this.boardsService.findOne(id);

    if (board) {
      return board;
    }

    throw new BoardNotFoundError();
  }

  @Put(':id')
  async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateBoardDto: UpdateBoardDto) {
    const user = await this.boardsService.update(id, updateBoardDto);

    if (user) {
      return user;
    }

    throw new BoardNotFoundError();
  }

  @Delete(':id')
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const deletedBoard = await this.boardsService.remove(id);

    if (deletedBoard) {
      return deletedBoard;
    }
    throw new BoardNotFoundError();
  }
}
