import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export default class SignInDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
