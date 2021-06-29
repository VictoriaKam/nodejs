import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'user'})
export class User {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column('text')
   name = '';

   @Column('text')
   login = '';

   @Column('text')
   password = '';
}
