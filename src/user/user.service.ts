import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
@Injectable()
export class UserService {
  prisma = new PrismaClient();
  async getListUser(): Promise<any> {
    try {
      let data = await this.prisma.nguoi_dung.findMany();
      return data;
    } catch (error) {
      return `${error}`;
    }
  }
}
