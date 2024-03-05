import { Injectable } from '@nestjs/common';
import { loginDTO } from './dto/login.dto';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { signUpDTO } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService, // import service thư viện jwt
    private configService: ConfigService,
  ) {
    // import service thư viện config (lấy các value trong file .env)
  }
  prisma = new PrismaClient();
  async login(body: loginDTO): Promise<any> {
    try {
      let { email, pass_word } = body;
      //kiểm tra email user có tồn tại trong db?
      let user = await this.prisma.nguoi_dung.findFirst({
        where: {
          email: email,
        },
      });
      if (user) {
        // nếu tồn tại user => kiểm tra pass
        let isCorrectPass = bcrypt.compareSync(pass_word, user.pass_word);
        if (isCorrectPass) {
          let payload = {
            user_id: user.id,
            email: user.email,
          };
          let token = this.jwtService.sign(payload, {
            secret: this.configService.get('SECRET_KEY'),
            expiresIn: this.configService.get('EXPIRE_IN'),
          });
          return {
            status: 200,
            token: token,
          };
        }
      }
      return {
        status: 400,
        message: 'Invalid user',
      };
    } catch (e) {
      return {
        status: 500,
        message: e,
      };
    }
  }
  async signUp(body: signUpDTO): Promise<any> {
    try {
      let { name, email, pass_word, phone, birth_day, gender, role } = body;
      let data = await this.prisma.nguoi_dung.findFirst({
        where: {
          email: email,
        },
      });
      if (data) {
        return {
          status: 400,
          message: 'Email đã được sử dụng',
        };
      } else {
        let encodedPass = bcrypt.hashSync(pass_word, 10);
        let newUser = {
          email: email,
          pass_word: encodedPass,
          name: name,
          phone: phone,
          birth_day: birth_day,
          gender: gender,
          role: role,
        };
        await this.prisma.nguoi_dung.create({
          data: newUser,
        });
        return {
          status: 201,
          message: 'Người dùng khởi tạo thành công',
        };
      }
    } catch (e) {
      return {
        status: 500,
        message: `Sign Up error ${e}`,
      };
    }
  }
}
