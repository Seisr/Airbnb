import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class LocationService {
  prisma = new PrismaClient();
  async getAllLocation(): Promise<any> {
    try {
      let data = await this.prisma.vi_tri.findMany();
      return {
        status: 200,
        data: data,
      };
    } catch (e) {
      return {
        status: 500,
        message: `getAllLocation error ${e}`,
      };
    }
  }
  async getLocationByPage(page: number, size: number): Promise<any> {
    try {
      let offset = (page - 1) * size;
      let data = await this.prisma.vi_tri.findMany({
        skip: offset,
        take: size,
      });
      return {
        status: 200,
        data: data,
      };
    } catch (e) {
      return {
        status: 500,
        message: `getLocationByPage error ${e}`,
      };
    }
  }
}
