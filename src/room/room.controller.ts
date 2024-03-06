import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { RoomService } from './room.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { roomDTO } from './dto/room.dto';

@ApiTags('Room')
@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get('/getAllRoom')
  async getAllRoom(@Res() res): Promise<any> {
    let data = await this.roomService.getAllRoom();
    res.status(data.status).json(data);
  }

  @ApiParam({ name: 'id', required: true })
  @Get('/getRoomByLocationId/:id')
  async getRoomByLocationId(@Param('id') id, @Res() res): Promise<any> {
    let data = await this.roomService.getRoomByLocationId(+id);
    res.status(data.status).json(data);
  }

  @ApiParam({ name: 'id', required: true })
  @Get('/getRoomByRoomId/:id')
  async getRoomByRoomId(@Param('id') id, @Res() res): Promise<any> {
    let data = await this.roomService.getRoomByRoomId(+id);
    res.status(data.status).json(data);
  }

  @ApiParam({ name: 'page', required: true })
  @ApiParam({ name: 'size', required: true })
  @Get('/getListRoomByPage/:page/:size')
  async getListRoomByPage(
    @Param('page') page,
    @Param('size') size,
    @Res() res,
  ): Promise<any> {
    let data = await this.roomService.getListRoomByPage(+page, +size);
    res.status(data.status).json(data);
  }

  @Post('/postRoom')
  async postRoom(@Body() body: roomDTO, @Res() res): Promise<any> {
    let data = await this.roomService.postRoom(body);
    res.status(data.status).json(data);
  }
}
