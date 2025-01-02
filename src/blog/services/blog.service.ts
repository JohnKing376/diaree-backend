import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from '../entities/blog.entity';
import { CreateBlogDtos } from '../dtos/create.blog.dtos';
import { Repository } from 'typeorm';
import { ListBlogOptions } from '../type_checking/ListBlog.options';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog) private blogRepository: Repository<Blog>,
  ) {}

  async createBlog(createBlogDto: CreateBlogDtos) {
    const { title, content } = createBlogDto;

    const newBlog = this.blogRepository.create({
      title,
      content,
    });

    await this.blogRepository.save(newBlog);

    return newBlog;
  }

  async getBlogById(id: number) {
    try {
      const blog = await this.blogRepository.findOneOrFail({
        where: {
          id,
        },
      });

      return blog;
    } catch (error) {
      throw new NotFoundException(error, 'Blog with id not found');
    }
  }

  async getBlogByIdentifer(identifier: string) {
    try {
      const blog = await this.blogRepository.findOneOrFail({
        where: {
          identifier,
        },
      });

      return blog;
    } catch (error) {
      throw new NotFoundException(error, 'Blog with identifier not found');
    }
  }

  async deleteBlog(id: number) {
    try {
      const blog = await this.blogRepository.findOneOrFail({
        where: {
          id,
        },
      });

      await this.blogRepository.delete(blog);
    } catch (error) {
      throw new NotFoundException(error, 'Blog with id not found');
    }
  }

  async listBlogs(listBlogOptions: ListBlogOptions) {
    const blogQuery = this.blogRepository.createQueryBuilder('blog');

    const { title } = listBlogOptions;

    if (title.length) {
      blogQuery.andWhere('blog.title LIKE :title', { title: `%${title}%` });
    }

    return blogQuery.getMany();
  }
}
