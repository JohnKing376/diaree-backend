import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/users/services/user/user.service';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

type AuthInput = { email: string; password: string };
type SignInInput = { userId: number; email: string };

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(input: AuthInput) {
    const user = await this.userService.findUserByEmail(input.email);
    const IsPasswordMatch = await compare(input.password, user.password);

    if (IsPasswordMatch) {
      return {
        userId: user.id,
        email: user.email,
      };
    }
    return null;
  }

  async authenticate(input: AuthInput) {
    const user = await this.validateUser(input);

    if (!user) throw new UnauthorizedException();

    return await this.SignIn(user);
  }

  async SignIn(userSignInDto: SignInInput) {
    const payload = { email: userSignInDto.email, sub: userSignInDto.userId };
    const token = await this.jwtService.signAsync(payload);

    return {
      token,
    };
  }
}
