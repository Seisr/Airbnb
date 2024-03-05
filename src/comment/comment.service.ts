import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { commentDTO } from './dto/comment.dto';
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

  async getCommentByRoomId(id: number): Promise<any> {
    try {
      let data = await this.prisma.binh_luan.findMany({
        where: {
          ma_phong: id,
        },
      });
      return {
        status: 200,
        data: data,
      };
    } catch (e) {
      return {
        status: 500,
        message: `getCommentById error ${e}`,
      };
    }
  }

  async postComment(body: commentDTO): Promise<any> {
    try {
      let {
        ma_phong,
        ma_nguoi_binh_luan,
        ngay_binh_luan,
        noi_dung,
        sao_binh_luan,
      } = body;
      let ngay_binh_luan2 = new Date(ngay_binh_luan).toISOString();
      let newComment = {
        ma_phong: ma_phong,
        ma_nguoi_binh_luan: ma_nguoi_binh_luan,
        ngay_binh_luan: ngay_binh_luan2,
        noi_dung: noi_dung,
        sao_binh_luan: sao_binh_luan,
      };
      await this.prisma.binh_luan.create({
        data: newComment,
      });
      return {
        status: 201,
        message: 'Tạo bình luận thành công',
      };
    } catch (e) {
      return {
        status: 500,
        message: `postComment error ${e}`,
      };
    }
  }
}
