import { Exclude } from 'class-transformer';
import User from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'blogs' })
export class Blog {
  @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  identifier: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Exclude()
  @Column({ nullable: true })
  userId: number;

  @ManyToOne(() => User, (user) => user.blogs)
  user: User;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdDate: Date;

  @UpdateDateColumn({
    name: 'update_at',
  })
  updatedDate: Date;
}
