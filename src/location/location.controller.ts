import { Controller, Get, Param, Res } from '@nestjs/common';
import { LocationService } from './location.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';

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
}
