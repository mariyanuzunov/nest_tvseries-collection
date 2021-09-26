import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerCustomOptions,
} from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const config = new DocumentBuilder()
    .setTitle('TV Series API')
    .setDescription('Nest.js REST API')
    .setVersion('1.0')
    .build();

  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'API Docs',
  };

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api', app, document, customOptions);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(5000);
}
bootstrap();
