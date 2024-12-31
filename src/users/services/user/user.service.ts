import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/users/entities/user.entity';
import CreateUserRecordOptions from 'src/users/type_checking/create-user-record-options';
import UpdateUserRecordOptions from 'src/users/type_checking/update-user-record-options';
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
    // const accessToken = this.authService.generateJwt(user);

    return user;
  }

  async findUserById(id: number): Promise<User | null> {
    const user = await this.userRepository.findOneOrFail({
      where: { id },
    });

    if (!user) throw new NotFoundException('User is not found');

    return user;
  }

  async updateUser(
    id: number,
    updateUserDto: UpdateUserRecordOptions,
  ): Promise<User> {
    const user = await this.findUserById(id);

    if (!user) throw new NotFoundException('User not found');

    await this.userRepository.update(id, updateUserDto);

    const updatedUser = await this.findUserById(id);

    return updatedUser;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOneOrFail({
      where: { email },
    });

    if (!user) throw new NotFoundException('User with email not found');

    return user;
  }

  async delete(id: number) {
    const user = await this.userRepository.delete(id);

    return user;
  }
}
