import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { Public } from '../decorators/public.decorator';
import SignInDto from '../dtos/sign-in-user.dto';

@Controller('auth/user')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.SignIn(signInDto);
  }
}
