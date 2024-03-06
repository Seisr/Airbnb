import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { locationDTO } from './dto/location.dto';

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

  async getLocationByLocationId(id: number): Promise<any> {
    try {
      let data = await this.prisma.vi_tri.findFirst({
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
        message: `getLocationByLocationId error ${e}`,
      };
    }
  }
  async postLocation(body: locationDTO): Promise<any> {
    try {
      let { ten_vi_tri, tinh_thanh, quoc_gia, hinh_anh } = body;
      let quoc_gia2 = Number(quoc_gia);
      let newLocation = {
        ten_vi_tri: ten_vi_tri,
        tinh_thanh: tinh_thanh,
        quoc_gia: quoc_gia2,
        hinh_anh: hinh_anh,
      };
      await this.prisma.vi_tri.create({
        data: newLocation,
      });
      return {
        status: 201,
        message: `post Location thành công`,
      };
    } catch (e) {
      return {
        status: 500,
        message: `postLocation error ${e}`,
      };
    }
  }
}
