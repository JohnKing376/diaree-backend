import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthInputDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
