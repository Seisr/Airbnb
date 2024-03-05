import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { commentDTO } from './dto/comment.dto';

@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get('/getAllComment')
  async getAllComment(@Res() res): Promise<any> {
    let data = await this.commentService.getAllComment();
    res.status(data.status).json(data);
  }

  @ApiParam({ name: 'id', required: true })
  @Get('/getCommentByRoomId/:id')
  async getCommentByRoomId(@Param('id') id, @Res() res): Promise<any> {
    let data = await this.commentService.getCommentByRoomId(+id);
    res.status(data.status).json(data);
  }

  @ApiBody({ type: commentDTO })
  @Post('/postComment')
  async postComment(@Body() body, @Res() res): Promise<any> {
    let data = await this.commentService.postComment(body);
    res.status(data.status).json(data);
  }

  @ApiParam({ name: 'id', required: true })
  @ApiBody({ type: commentDTO })
  @Put('/editCommentByCommentId/:id')
  async editComment(@Param('id') id, @Body() body, @Res() res): Promise<any> {
    let data = await this.commentService.editComment(+id, body);
    res.status(data.status).json(data);
  }

  @ApiParam({ name: 'id', required: true })
  @Delete('/deleteCommentByCommentId/:id')
  async deleteComment(@Param('id') id, @Body() body, @Res() res): Promise<any> {
    let data = await this.commentService.deleteComment(+id);
    res.status(data.status).json(data);
  }
}
