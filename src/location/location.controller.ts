import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { LocationService } from './location.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { locationDTO } from './dto/location.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FilesUploadDto } from './dto/file.dto';
import { PrismaClient } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@ApiTags('Location')
@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}
  prisma = new PrismaClient();

  @UseGuards(AuthGuard('jwt'))
  @Get('/getAllLocation')
  async getAllLocation(@Res() res): Promise<any> {
    let data = await this.locationService.getAllLocation();
    res.status(data.status).json(data);
  }
  @ApiParam({ name: 'page', required: false })
  @ApiParam({ name: 'size', required: false })
  @Get('/getLocationByPage/:page/:size')
  async getLocationByPage(
    @Param('page') page,
    @Param('size') size,
    @Res() res,
  ) {
    let data = await this.locationService.getLocationByPage(+page, +size);
    res.status(data.status).json(data);
  }

  @ApiParam({ name: 'id', required: true })
  @Get('getLocationByLocationId/:id')
  async getLocationByLocationId(
    @Param('id') id: number,
    @Res() res,
  ): Promise<any> {
    let data = await this.locationService.getLocationByLocationId(+id);
    res.status(data.status).json(data);
  }

  @ApiBody({ type: locationDTO })
  @Post('/postLocation')
  async postLocation(@Body() body: locationDTO, @Res() res): Promise<any> {
    let data = await this.locationService.postLocation(body);
    res.status(data.status).json(data);
  }

  @ApiBody({ type: locationDTO })
  @ApiParam({ name: 'id' })
  @Put('/editLocationByLocationId/:id')
  async editLocation(@Param('id') id, @Body() body, @Res() res): Promise<any> {
    let data = await this.locationService.editLocation(+id, body);
    res.status(data.status).json(data);
  }

  @ApiParam({ name: 'id', required: true })
  @Delete('/deleteLocationByLocationId/:id')
  async deleteLocation(@Param('id') id, @Res() res): Promise<any> {
    let data = await this.locationService.deleteLocation(+id);
    res.status(data.status).json(data);
  }

  @Post('/uploadImg/:id')
  @ApiParam({ name: 'id', required: true })
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
  async uploadImg(
    @Param('id') id,
    @UploadedFile('file') file,
    @Res() res,
  ): Promise<any> {
    let data = await this.locationService.uploadImg(+id, file);
    res.status(data.status).json(data);
  }

  @Post('/uploadImgCloud/:id')
  @ApiParam({ name: 'id', required: true })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: FilesUploadDto })
  @UseInterceptors(FileInterceptor('file'))
  async uploadImgCloud(
    @Param('id') id,
    @UploadedFile('file') file: Express.Multer.File,
    @Res() res,
  ): Promise<any> {
    let data = await this.locationService.uploadImgCloud(file);
    let data2 = await this.locationService.saveToDB(+id, data.url);
    res.status(data2.status).json(data2);
    // return file
  }
}
