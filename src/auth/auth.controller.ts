import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDTO } from './dto/login.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { signUpDTO } from './dto/signup.dto';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiBody({ type: loginDTO })
  @Post('/login')
  async login(@Body() body, @Res() res): Promise<any> {
    let data = await this.authService.login(body);
    res.status(data.status).json(data);
  }
  @ApiBody({ type: signUpDTO })
  @Post('signUp')
  async signUp(@Body() body, @Res() res): Promise<any> {
    let data = await this.authService.signUp(body);
    res.status(data.status).json(data);
  }
}
