import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CommentService } from './comment/comment.service';
import { CommentModule } from './comment/comment.module';
import { BookingModule } from './booking/booking.module';
import { RoomModule } from './room/room.module';

@Module({
  imports: [UserModule, AuthModule, CommentModule, BookingModule, RoomModule],
  controllers: [AppController],
  providers: [AppService, CommentService],
})
export class AppModule {}
