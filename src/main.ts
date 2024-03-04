import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // setup swagger
  // setup document cho swagger
  const config = new DocumentBuilder()
    .setTitle('Capstone Airbnb')
    .setDescription('Danh sách các api về Airbnb')
    .setVersion('1.0')
    .build();
  const swagger = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, swagger);

  await app.listen(3000);
}
bootstrap();
