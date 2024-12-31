import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Public } from 'src/auth/decorators/public.decorator';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { UserService } from 'src/users/services/user/user.service';

@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Public()
  @Post('create')
  async createUser(@Body() userDto: CreateUserDto) {
    try {
      const user = await this.userService.createUser(userDto);

      const payload = { email: user.email, sub: user.id };

      const token = await this.jwtService.signAsync(payload);

      return {
        userDetails: {
          identifier: user.identifier,
          firstName: user.firstName,
          lastName: user.lastName,
          accessToken: {
            token,
          },
          fullName: user.fullname,
          meta: {
            isActive: user.isActive,
            createdAt: user.createdDate,
          },
        },
      };
    } catch (createUserError) {
      throw new InternalServerErrorException(
        'Internal Server Error. --->',
        JSON.stringify(`CreateUserError.${createUserError}`, null, 2),
      );
    }
  }
}
