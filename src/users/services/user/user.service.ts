import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/users/entities/user.entity';
import CreateUserRecordOptions from 'src/users/type_checking/create-user-record-options';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserRecordOptions): Promise<User> {
    const { firstName, lastName, email, password } = createUserDto;

    const user = this.userRepository.create({
      firstName,
      lastName,
      email,
      password,
    });

    await this.userRepository.save(user);

    return user;
  }

  //   async findUser(): Promise<User | null> {
  //     const user = this.userRepository.;

  //     if (!user) throw new NotFoundException('User is not found');

  //     return user;
  //   }
}
