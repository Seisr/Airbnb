import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class RoomService {
  prisma = new PrismaClient();
  async getAllRoom() {
    try {
      let data = await this.prisma.phong.findMany();
      return {
        status: 200,
        data: data,
      };
    } catch (e) {
      return {
        status: 500,
        message: `getAllRoom error ${e}`,
      };
    }
  }
  async getRoomByLocationId(id: number): Promise<any> {
    try {
      let data = await this.prisma.phong.findMany({
        where: {
          ma_vi_tri: id,
        },
      });
      return {
        status: 200,
        data: data,
      };
    } catch (e) {
      return {
        status: 500,
        message: `getRoomByLocationId error ${e}`,
      };
    }
  }
  async getRoomByRoomId(id: number): Promise<any> {
    try {
      let data = await this.prisma.phong.findFirst({
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
        message: `getRoomByRoomId error ${e}`,
      };
    }
  }
}
