import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { ApiBody, ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger';
import { roomDTO } from './dto/room.dto';
import { FilesUploadDto } from 'src/location/dto/file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

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

  @ApiParam({ name: 'id', required: true })
  @Put('/editRoomById/:id')
  async editRoomById(
    @Param('id') id,
    @Body() body: roomDTO,
    @Res() res,
  ): Promise<any> {
    let data = await this.roomService.editRoomById(+id, body);
    res.status(data.status).json(data);
  }

  @ApiParam({ name: 'id', required: true })
  @Delete('/deleteRoomById/:id')
  async deleteRoomById(@Param('id') id, @Res() res): Promise<any> {
    let data = await this.roomService.deleteRoomById(+id);
    res.status(data.status).json(data);
  }

  @ApiParam({ name: 'id', required: true })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: FilesUploadDto })
  @Post('/uploadRoomImg/:id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: process.cwd() + '/public/imgRoom',
        filename: (req, file, callback) => {
          callback(null, new Date().getTime() + `${file.originalname}`);
        },
      }),
    }),
  )
  async uploadRoomImg(
    @Param('id') id,
    @UploadedFile('file') file,
    @Res() res,
  ): Promise<any> {
    let data = await this.roomService.uploadImg(+id, file);
    res.status(data.status).json(data);
  }
}
