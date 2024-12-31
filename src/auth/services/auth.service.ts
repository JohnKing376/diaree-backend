import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from 'src/users/services/user/user.service';
import SignInDto from '../dtos/sign-in-user.dto';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async SignIn(userSignInDto: SignInDto) {
    const { email, password } = userSignInDto;
    const user = await this.userService.findUserByEmail(email);

    if (!user) throw new NotFoundException('User not found');

    const IsPasswordMatch = await compare(password, user.password);

    if (!IsPasswordMatch) throw new BadRequestException('Invalid credentials');

    const payload = { email: email, sub: user.id };

    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token,
    };
  }
}
