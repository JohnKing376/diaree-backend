import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { BlogService } from '../services/blog.service';
import { CreateBlogDtos } from '../dtos/create.blog.dtos';
import { GetUser } from 'src/auth/decorators/get_user.decorator';
import SignInDto from 'src/auth/dtos/sign-in-user.dto';
import { UserService } from 'src/users/services/user/user.service';
import { Response } from 'express';
import User from 'src/users/entities/user.entity';

@Controller('blog')
export class BlogController {
  constructor(
    private blogService: BlogService,
    private userService: UserService,
  ) {}

  @Post('create')
  @HttpCode(201)
  async createBlog(
    @GetUser()
    user: SignInDto,
    @Body() createBlogDto: CreateBlogDtos,
    @Res() response: Response,
  ) {
    const userId = await this.userService.findUserById(user.userId);
    const blog = await this.blogService.createBlog(createBlogDto, userId);

    response.send({
      message: 'Blog Successfully Created',
      statusCode: HttpStatus.CREATED,
      status: 'SUCCESS',
      blogDetails: {
        identifier: blog.identifier,
        title: blog.title,
        content: blog.content,
        createdAt: blog.createdDate,
        updatedAt: blog.updatedDate,
      },
    });
  }

  @Get('/:identifier')
  async getBlogByIdentifier(
    @GetUser() user: User,
    @Param('identifier') identifier: string,
  ) {
    console.log(identifier);
    const blog = await this.blogService.getBlogByIdentifer(identifier);
    return blog;
  }
}
