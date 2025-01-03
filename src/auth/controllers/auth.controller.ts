import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { Public } from '../decorators/public.decorator';

import { AuthInputDto } from '../dtos/auth-input-user.dto';
import { UserService } from 'src/users/services/user/user.service';
import { Response } from 'express';

@Controller('auth/user')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() input: AuthInputDto, @Res() response: Response) {
    const token = await this.authService.authenticate(input);

    const user = await this.userService.findUserByEmail(input.email);

    await this.userService.updateUser(user.id, {
      updatedDate: new Date(),
    });

    response.send({
      message: 'User Authenticated Successfully',
      statusCode: HttpStatus.OK,
      status: 'SUCCESS',
      userDetails: {
        identifier: user.identifier,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        accessToken: token,
        fullName: user.fullname,
        meta: {
          isActive: user.isActive,
          createdAt: user.createdDate,
          lastLoginDate: user.updatedDate,
        },
      },
    });
  }
}
