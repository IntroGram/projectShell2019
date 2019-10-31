import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import User from './user';
import ToDo from './todo';

@Entity()
export default class Categories {
  @PrimaryGeneratedColumn()
  id

  @Column({ type: 'varchar', unique: true })
  name

  @OneToMany(() => ToDo, (todo) => todo.category,{eager:true})
  tags

  @ManyToOne(() => User, (user) => user.userCategories)
  user

}