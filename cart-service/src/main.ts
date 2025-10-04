import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes( new ValidationPipe({whitelist: true, transform: true}));
  const cfg = new DocumentBuilder()
    .setTitle('Cart Service')
    .setDescription('Shopping cart API')
    .setVersion('1.0.0')
    .addApiKey({ type: 'apiKey', name: 'x-user-id', in: 'header' }, 'x-user-id')
    .build();

  const doc = SwaggerModule.createDocument(app, cfg);
  SwaggerModule.setup('cart/docs', app, doc, {
    swaggerOptions: { persistAuthorization: true },
  });
  await app.listen(process.env.PORT ?? 3002);
}
bootstrap();
