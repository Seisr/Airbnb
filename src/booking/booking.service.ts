import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

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
}
