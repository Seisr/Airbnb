import { ApiProperty } from '@nestjs/swagger';

export class locationDTO {
  @ApiProperty()
  ten_vi_tri: string;
  @ApiProperty()
  tinh_thanh: string;
  @ApiProperty()
  quoc_gia: number;
  @ApiProperty()
  hinh_anh: string;
}
