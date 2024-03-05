import { ApiProperty } from '@nestjs/swagger';

export class loginDTO {
  @ApiProperty()
  email: string;

  @ApiProperty()
  pass_word: string;
}
