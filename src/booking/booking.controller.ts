import { Controller, Get, Param, Res } from '@nestjs/common';
import { BookingService } from './booking.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Booking')
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get('/getAllBooking')
  async getAllBooking(@Res() res): Promise<any> {
    let data = await this.bookingService.getAllBooking();
    res.status(data.status).json(data);
  }
  @ApiParam({ name: 'id', required: true })
  @Get('/getBookingByBookingId/:id')
  async getBookingById(@Param('id') id, @Res() res): Promise<any> {
    let data = await this.bookingService.getBookingById(+id);
    res.status(data.status).json(data);
  }
}
