import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { editDTO } from './dto/edit.dto';
import * as bcrypt from 'bcrypt';
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
  async editUserById(id: number, body: editDTO): Promise<any> {
    try {
      let { name, email, pass_word, phone, birth_day, gender, role } = body;
      let encodedPass = bcrypt.hashSync(pass_word, 10);
      let id2 = Number(id);
      let updateData = {
        name: name,
        email: email,
        pass_word: encodedPass,
        phone: phone,
        birth_day: birth_day,
        gender: gender,
        role: role,
      };
      await this.prisma.nguoi_dung.update({
        where: {
          id: id2,
        },
        data: updateData,
      });
      return {
        status: 200,
        message: 'edit thông tin thành công',
      };
    } catch (e) {
      return {
        status: 500,
        message: `editUserById error ${e}`,
      };
    }
  }
  async deleteUserById(id: string): Promise<any> {
    try {
      let id2 = Number(id);
      await this.prisma.nguoi_dung.delete({
        where: {
          id: id2,
        },
      });
      return {
        status: 200,
        message: 'Xóa người dùng thành công',
      };
    } catch (e) {
      return {
        status: 500,
        message: `deleteUserById error ${e}`,
      };
    }
  }
}
