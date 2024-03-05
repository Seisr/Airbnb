import { Controller, Get, Res } from '@nestjs/common';
import { CommentService } from './comment.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get('/getAllComment')
  async getAllComment(@Res() res): Promise<any> {
    let data = await this.commentService.getAllComment();
    res.status(data.status).json(data);
  }
}
