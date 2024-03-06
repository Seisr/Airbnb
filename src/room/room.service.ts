import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { roomDTO } from './dto/room.dto';

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
  async getListRoomByPage(page: number, size: number): Promise<any> {
    try {
      let offset = (page - 1) * size;
      let data = await this.prisma.phong.findMany({
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
        message: `getListRoomByPage error ${e}`,
      };
    }
  }
  async postRoom(body: roomDTO): Promise<any> {
    try {
      let {
        ma_vi_tri,
        ten_phong,
        so_khach,
        so_phong_ngu,
        so_giuong,
        so_phong_tam,
        mo_ta,
        gia_tien,
        may_giat,
        ban_la,
        tivi,
        dieu_hoa,
        wifi,
        bep,
        do_xe,
        ho_boi,
        ban_ui,
        hinh_anh,
      } = body;
      let newRoom = {
        ma_vi_tri: ma_vi_tri,
        ten_phong: ten_phong,
        so_khach: so_khach,
        so_phong_ngu: so_phong_ngu,
        so_giuong: so_giuong,
        so_phong_tam: so_phong_tam,
        mo_ta: mo_ta,
        gia_tien: gia_tien,
        may_giat: may_giat,
        ban_la: ban_la,
        tivi: tivi,
        dieu_hoa: dieu_hoa,
        wifi: wifi,
        bep: bep,
        do_xe: do_xe,
        ho_boi: ho_boi,
        ban_ui: ban_ui,
        hinh_anh: hinh_anh,
      };
      await this.prisma.phong.create({
        data: newRoom,
      });
      return {
        status: 201,
        message: `Tạo room mới thành công`,
      };
    } catch (e) {
      return {
        status: 500,
        message: `postRoom error ${e}`,
      };
    }
  }
  async editRoomById(id: number, body: roomDTO): Promise<any> {
    try {
      let {
        ma_vi_tri,
        ten_phong,
        so_khach,
        so_phong_ngu,
        so_giuong,
        so_phong_tam,
        mo_ta,
        gia_tien,
        may_giat,
        ban_la,
        tivi,
        dieu_hoa,
        wifi,
        bep,
        do_xe,
        ho_boi,
        ban_ui,
        hinh_anh,
      } = body;
      let newRoom = {
        ma_vi_tri: ma_vi_tri,
        ten_phong: ten_phong,
        so_khach: so_khach,
        so_phong_ngu: so_phong_ngu,
        so_giuong: so_giuong,
        so_phong_tam: so_phong_tam,
        mo_ta: mo_ta,
        gia_tien: gia_tien,
        may_giat: may_giat,
        ban_la: ban_la,
        tivi: tivi,
        dieu_hoa: dieu_hoa,
        wifi: wifi,
        bep: bep,
        do_xe: do_xe,
        ho_boi: ho_boi,
        ban_ui: ban_ui,
        hinh_anh: hinh_anh,
      };
      await this.prisma.phong.update({
        where: {
          id: id,
        },
        data: newRoom,
      });
      return {
        status: 201,
        message: `editRoomById thành công`,
      };
    } catch (e) {
      return {
        status: 500,
        message: `editRoomById error ${e}`,
      };
    }
  }
  async uploadImg(id, file): Promise<any> {
    try {
      let newData = {
        ma_vi_tri: undefined,
        ten_phong: undefined,
        so_khach: undefined,
        so_phong_ngu: undefined,
        so_giuong: undefined,
        so_phong_tam: undefined,
        mo_ta: undefined,
        gia_tien: undefined,
        may_giat: undefined,
        ban_la: undefined,
        tivi: undefined,
        dieu_hoa: undefined,
        wifi: undefined,
        bep: undefined,
        do_xe: undefined,
        ho_boi: undefined,
        ban_ui: undefined,
        hinh_anh: file.path,
      };
      await this.prisma.phong.update({
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
  async deleteRoomById(id): Promise<any> {
    try {
      await this.prisma.phong.delete({
        where: {
          id: id,
        },
      });
      return {
        status: 200,
        message: 'delete Room thành công',
      };
    } catch (e) {
      return {
        status: 500,
        message: `deleteRoomById error ${e}`,
      };
    }
  }
}
