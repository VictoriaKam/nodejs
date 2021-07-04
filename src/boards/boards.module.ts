import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';

@Module({
  controllers: [BoardsController],
  providers: [BoardsService],
  imports: [AuthModule]
})
export class BoardsModule {}
