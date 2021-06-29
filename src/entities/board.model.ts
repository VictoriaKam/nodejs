import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { Columns } from "./columns.model";

@Entity({name: 'board'})
export class Board {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column('text')
   title = '';

   @OneToMany(() => Columns, columns => columns.board)
    columns: Columns[];
}
