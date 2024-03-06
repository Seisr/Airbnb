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
import { UserService } from './user.service';
import { ApiBody, ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger';
import { editDTO } from './dto/edit.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FilesUploadDto } from 'src/location/dto/file.dto';
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/getAllUser')
  async getAllUser(@Res() res): Promise<any> {
    let data = await this.userService.getAllUser();
    res.status(data.status).json(data);
  }

  @ApiParam({ name: 'page', required: false })
  @ApiParam({ name: 'size', required: false })
  @Get('/getListUser/:page/:size')
  async getListUser(
    @Param('page') page,
    @Param('size') size,
    @Res() response,
  ): Promise<any> {
    let data = await this.userService.getListUser(page, size);
    response.status(data.status).json(data);
  }
  @ApiParam({ name: 'id', required: false })
  @Get('/getUserById/:id')
  async getUserById(@Param('id') id, @Res() res): Promise<any> {
    let data = await this.userService.getUserById(id);
    res.status(data.status).json(data);
  }
  @ApiParam({ name: 'name', required: false })
  @Get('/searchUserByName/:name')
  async searchUserByName(@Param('name') name, @Res() res): Promise<any> {
    let data = await this.userService.searchUserByName(name);
    res.status(data.status).json(data);
  }
  @ApiParam({ name: 'id', required: true })
  @ApiBody({ type: editDTO })
  @Put('/editUserById/:id')
  async editUserById(@Param('id') id, @Body() body, @Res() res): Promise<any> {
    let data = await this.userService.editUserById(id, body);
    res.status(data.status).json(data);
  }

  @ApiParam({ name: 'id', required: true })
  @Delete('/deleteUserById/:id')
  async deleteUserById(@Param('id') id, @Res() res): Promise<any> {
    let data = await this.userService.deleteUserById(id);
    res.status(data.status).json(data);
  }

  @Post('/uploadAvatar/')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: FilesUploadDto })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: process.cwd() + '/public/imgLocation',
        filename: (req, file, callback) => {
          callback(null, new Date().getTime() + `${file.originalname}`);
        },
      }),
    }),
  )
  async uploadImg(@UploadedFile('file') file): Promise<any> {
    return file;
    // let data = await this.userService.uploadImg(file);
    // res.status(data.status).json(data);
  }

  // @Post('/uploadAvatar')
  // @UseInterceptors(
  //   FileInterceptor('file', {
  //     storage: diskStorage({
  //       destination: process.cwd() + '/public/img',
  //       filename: (req, file, callback) => {
  //         callback(null, new Date().getTime() + `${file.originalname}`);
  //       },
  //     }),
  //   }),
  // )
  // uploadAvatar(@UploadedFile('file') file) {
  //   return file;
  // }
}
