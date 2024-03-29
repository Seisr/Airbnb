import { Injectable, UseGuards } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { locationDTO } from './dto/location.dto';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
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
  async editLocation(id: number, body: locationDTO): Promise<any> {
    try {
      let { ten_vi_tri, tinh_thanh, quoc_gia, hinh_anh } = body;
      let quoc_gia2 = Number(quoc_gia);
      let newLocation = {
        ten_vi_tri: ten_vi_tri,
        tinh_thanh: tinh_thanh,
        quoc_gia: quoc_gia2,
        hinh_anh: hinh_anh,
      };
      await this.prisma.vi_tri.update({
        where: {
          id: id,
        },
        data: newLocation,
      });
      return {
        status: 201,
        message: `editLocation thành công`,
      };
    } catch (e) {
      return {
        status: 500,
        message: `editLocation error ${e}`,
      };
    }
  }
  async deleteLocation(id: number): Promise<any> {
    try {
      await this.prisma.vi_tri.delete({
        where: {
          id: id,
        },
      });
      return {
        status: 200,
        message: `deleteLocation thành công`,
      };
    } catch (e) {
      return {
        status: 500,
        message: `delete Location error ${e}`,
      };
    }
  }
  async uploadImg(id, file): Promise<any> {
    try {
      let newData = {
        ten_vi_tri: undefined,
        tinh_thanh: undefined,
        quoc_gia: undefined,
        hinh_anh: file.path,
      };
      await this.prisma.vi_tri.update({
        where: {
          id: id,
        },
        data: newData,
      });
      return {
        status: 200,
        message: `uploadImg thành công`,
      };
    } catch (e) {
      return {
        status: 500,
        message: `uploadImg error ${e}`,
      };
    }
  }
  async uploadImgCloud(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream((error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
      toStream(file.buffer).pipe(upload);
    });
  }

  async saveToDB(id, url) {
    try {
      let newData = {
        ten_vi_tri: undefined,
        tinh_thanh: undefined,
        quoc_gia: undefined,
        hinh_anh: url,
      };
      await this.prisma.vi_tri.update({
        where: {
          id: id,
        },
        data: newData,
      });
      return {
        status: 200,
        message: `uploadImgCloud thành công`,
      };
    } catch (e) {
      return {
        status: 500,
        message: `uploadImg error ${e}`,
      };
    }
  }
}
