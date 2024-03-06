import { Controller, Get, Res } from '@nestjs/common';
import { LocationService } from './location.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Location')
@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get('/getAllLocation')
  async getAllLocation(@Res() res): Promise<any> {
    let data = await this.locationService.getAllLocation();
    res.status(data.status).json(data);
  }
}
