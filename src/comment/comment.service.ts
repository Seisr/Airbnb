import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
@Injectable()
export class CommentService {
  prisma = new PrismaClient();
  async getAllComment(): Promise<any> {
    try {
      let data = await this.prisma.binh_luan.findMany();
      return {
        status: 200,
        data: data,
      };
    } catch (e) {
      return {
        status: 500,
        message: `getAllComment error ${e}`,
      };
    }
  }
}
