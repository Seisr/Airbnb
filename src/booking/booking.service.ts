import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { bookingDTO } from './dto/booking.dto';

@Injectable()
export class BookingService {
  prisma = new PrismaClient();
  async getAllBooking(): Promise<any> {
    try {
      let data = await this.prisma.dat_phong.findMany();
      return {
        status: 200,
        data: data,
      };
    } catch (e) {
      return {
        status: 500,
        message: `getAllBooking error ${e}`,
      };
    }
  }
  async getBookingById(id: number): Promise<any> {
    try {
      let data = await this.prisma.dat_phong.findFirst({
        where: {
          id: id,
        },
      });
      return {
        status: 200,
        data: data,
      };
    } catch (e) {
      return {
        status: 500,
        message: `getBookingById error ${e}`,
      };
    }
  }
  async postBooking(body: bookingDTO): Promise<any> {
    try {
      let { ma_phong, ngay_den, ngay_di, so_luong_khach, ma_nguoi_dat } = body;
      let ngay_den2 = new Date(ngay_den).toISOString();
      let ngay_di2 = new Date(ngay_di).toISOString();
      let newBooking = {
        ma_phong: ma_phong,
        ngay_den: ngay_den2,
        ngay_di: ngay_di2,
        so_luong_khach: so_luong_khach,
        ma_nguoi_dat: ma_nguoi_dat,
      };
      await this.prisma.dat_phong.create({
        data: newBooking,
      });
      return {
        status: 201,
        message: 'Tạo Booking thành công',
      };
    } catch (e) {
      return {
        status: 500,
        message: `postBooking error ${e}`,
      };
    }
  }
}
