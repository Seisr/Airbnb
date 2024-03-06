import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { CloudinaryProvider } from './cloudinary.provider';

@Module({
  controllers: [LocationController],
  providers: [LocationService, CloudinaryProvider],
})
export class LocationModule {}
