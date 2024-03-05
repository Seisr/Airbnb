import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UserService {
  prisma = new PrismaClient();
  async getAllUser(): Promise<any> {
    try {
      let data = await this.prisma.nguoi_dung.findMany();
      return {
        status: 200,
        data: data,
      };
    } catch (error) {
      return {
        status: 500,
        message: error,
      };
    }
  }
  async getListUser(page: string, size: string): Promise<any> {
    try {
      let numPage = Number(page);
      let numSize = Number(size);
      let offset = (numPage - 1) * numSize;
      let data = await this.prisma.nguoi_dung.findMany({
        skip: offset,
        take: numSize,
      });
      //   return data;
      return {
        status: 200,
        data: data,
      };
    } catch (error) {
      //   return `${error}`;
      return {
        status: 500,
        message: error,
      };
    }
  }
  async getUserById(id: string): Promise<any> {
    try {
      let id2 = Number(id);
      let data = await this.prisma.nguoi_dung.findFirst({
        where: {
          id: id2,
        },
      });
      return {
        status: 200,
        data: data,
      };
    } catch (error) {
      return {
        status: 500,
        message: error,
      };
    }
  }
  async searchUserByName(name: string): Promise<any> {
    try {
      let data = await this.prisma.nguoi_dung.findMany({
        where: {
          name: name,
        },
      });
      if (data.length != 0) {
        return {
          status: 200,
          message: data,
        };
      } else {
        return {
          status: 404,
          message: 'User name not found',
        };
      }
    } catch (error) {
      return {
        status: 500,
        message: error,
      };
    }
  }
}
