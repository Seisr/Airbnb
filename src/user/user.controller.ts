import { Controller, Get, Param, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/getAllUser')
  async getAllUser(@Res() res): Promise<any> {
    let data = await this.userService.getAllUser();
    res.status(data.status).json(data);
  }

  @ApiParam({ name: 'page', required: false })
  @ApiParam({ name: 'size', required: false })
  @Get('/getListUser/:page/:size')
  async getListUser(
    @Param('page') page,
    @Param('size') size,
    @Res() response,
  ): Promise<any> {
    let data = await this.userService.getListUser(page, size);
    response.status(data.status).json(data);
  }
  @ApiParam({ name: 'id', required: false })
  @Get('/getUserById/:id')
  async getUserById(@Param('id') id, @Res() res): Promise<any> {
    let data = await this.userService.getUserById(id);
    res.status(data.status).json(data);
  }
  @ApiParam({ name: 'name', required: false })
  @Get('/searchUserByName/:name')
  async searchUserByName(@Param('name') name, @Res() res): Promise<any> {
    let data = await this.userService.searchUserByName(name);
    res.status(data.status).json(data);
  }
}
