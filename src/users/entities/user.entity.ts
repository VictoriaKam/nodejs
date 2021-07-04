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

   static toResponse(user: { id: string, name: string, login: string }): { id: string, name: string, login: string } {
      const { id, name, login } = user;
      return { id, name, login };
    }
}
