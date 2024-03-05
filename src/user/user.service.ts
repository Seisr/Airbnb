import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UserService {
  prisma = new PrismaClient();
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
}
