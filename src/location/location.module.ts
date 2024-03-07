import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { CloudinaryProvider } from './cloudinary.provider';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/strategy/jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: 'kha38',
      signOptions: { expiresIn: '3h' },
    }),
  ],
  controllers: [LocationController],
  providers: [LocationService, CloudinaryProvider, JwtStrategy],
})
export class LocationModule {}
