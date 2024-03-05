import { Controller, Get, Res } from '@nestjs/common';
import { BookingService } from './booking.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Booking')
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get('/getAllBooking')
  async getAllBooking(@Res() res): Promise<any> {
    let data = await this.bookingService.getAllBooking();
    res.status(data.status).json(data);
  }
}
