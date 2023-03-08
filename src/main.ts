import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AuthModule } from './resource/auth/auth.module';
import { UsersModule } from './resource/users/users.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Simplex API')
    .setDescription('The Simplex API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config,{include:[AuthModule,UsersModule],ignoreGlobalPrefix: true});
  SwaggerModule.setup('api/auth', app, document);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(4100);
}
bootstrap();
