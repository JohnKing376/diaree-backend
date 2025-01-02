import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import { BlogService } from '../services/blog.service';
import { CreateBlogDtos } from '../dtos/create.blog.dtos';

@Controller('blog')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Post('create')
  @HttpCode(200)
  async createBlog(@Res() response, @Body() createBlogDto: CreateBlogDtos) {
    const blog = await this.blogService.createBlog(createBlogDto);

    return blog;
  }
}
