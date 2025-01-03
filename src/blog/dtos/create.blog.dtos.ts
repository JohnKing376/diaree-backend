import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBlogDtos {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}
