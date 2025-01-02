import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import * as bcrypt from 'bcryptjs';
import { Blog } from 'src/blog/entities/blog.entity';
import { Exclude } from 'class-transformer';

@Entity({ name: 'users' })
export default class User {
  @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  identifier: string;

  @Column({ name: 'first_name', nullable: false })
  firstName: string;

  @Column({ name: 'last_name', nullable: false })
  lastName: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Exclude()
  @Column({ nullable: false })
  password: string;

  @Column({ default: false })
  isActive: boolean;

  @OneToMany(() => Blog, (blog) => blog.user)
  blogs: Blog[];

  @CreateDateColumn({
    name: 'created_at',
  })
  createdDate: Date;

  @UpdateDateColumn({
    name: 'update_at',
  })
  updatedDate: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  get fullname() {
    return `${this.firstName} ${this.lastName}`;
  }
}
