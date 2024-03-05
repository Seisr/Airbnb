import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CommentService } from './comment/comment.service';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [UserModule, AuthModule, CommentModule],
  controllers: [AppController],
  providers: [AppService, CommentService],
})
export class AppModule {}
