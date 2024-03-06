import { ApiProperty } from '@nestjs/swagger';

export class roomDTO {
  @ApiProperty()
  ma_vi_tri: number;
  @ApiProperty()
  ten_phong: string;
  @ApiProperty()
  so_khach: number;
  @ApiProperty()
  so_phong_ngu: number;
  @ApiProperty()
  so_giuong: number;
  @ApiProperty()
  so_phong_tam: number;
  @ApiProperty()
  mo_ta: string;
  @ApiProperty()
  gia_tien: number;
  @ApiProperty()
  may_giat: boolean;
  @ApiProperty()
  ban_la: boolean;
  @ApiProperty()
  tivi: boolean;
  @ApiProperty()
  dieu_hoa: boolean;
  @ApiProperty()
  wifi: boolean;
  @ApiProperty()
  bep: boolean;
  @ApiProperty()
  do_xe: boolean;
  @ApiProperty()
  ho_boi: boolean;
  @ApiProperty()
  ban_ui: boolean;
  @ApiProperty()
  hinh_anh: string;
}
