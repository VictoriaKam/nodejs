import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

import { Board } from "./board.model";

@Entity({name: 'columns'})
export class Columns {
   @PrimaryGeneratedColumn('increment')
   id: number;

   @Column('text')
   title = 'text';

   @Column('integer')
   order = 1;

   @ManyToOne(() => Board, board => board.columns)
   board: Board;
}
