import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { Board } from "./board.entity";

@Entity({name: 'columns'})
export class Columns {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column('text')
   title = 'text';

   @Column('integer')
   order = 1;

   @ManyToOne(() => Board, board => board.columns)
   board: Board;
}
