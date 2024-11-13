import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

import { config } from './config';

import { CustomValidationPipe } from './shared/CustomValidationPipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.setGlobalPrefix('v1/');
  app.enableCors();
  app.useGlobalPipes(
    new CustomValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Rental Office')
    .setDescription('Rental Office API v1')
    .setVersion('1.0')
    .addSecurity('bearer', {
      type: 'http',
    })
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api', app, document, {
    jsonDocumentUrl: 'swagger/json',
    explorer: true,
  });

  await app.listen(config.SERVER_PORT);
}
bootstrap();
