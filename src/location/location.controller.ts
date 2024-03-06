import { Body, Controller, Get, Param, Post, Put, Res } from '@nestjs/common';
import { LocationService } from './location.service';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { locationDTO } from './dto/location.dto';

@ApiTags('Location')
@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

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
}
