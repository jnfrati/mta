import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PostsDto } from './posts.dto';
import { PostsService } from './posts.service';

@Controller('tenants/:tenantId/posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  async getPosts(
    @Param('tenantId', new ParseIntPipe()) tenantId: number,
    @Query('categoryId') categoryId?: string,
  ) {
    const parsedCategoryId = parseInt(categoryId);

    return this.postsService.getPosts(tenantId, parsedCategoryId);
  }

  @Get('/:id')
  async getPost(@Param('id', new ParseIntPipe()) id: number) {
    return this.postsService.getPost(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createPost(
    @Param('tenantId', new ParseIntPipe()) tenantId: number,
    @Body() body: PostsDto,
  ) {
    return this.postsService.createPost(body, tenantId);
  }

  @Patch('/:id')
  @UseGuards(JwtAuthGuard)
  async updatePost(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() body: PostsDto,
  ) {
    return this.postsService.updatePost(id, body);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  async deletePost(@Param('id', new ParseIntPipe()) id: number) {
    return this.postsService.deletePost(id);
  }
}
