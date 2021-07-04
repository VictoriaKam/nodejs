import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'task'})
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  title = '';

  @Column('integer')
  order = 1;

  @Column('text')
  description = '';

  @Column({type: 'text', nullable: true })
  userId = '';

  @Column('text')
  boardId = '';

  @Column({type: 'text', nullable: true })
  columnId = '';
}
