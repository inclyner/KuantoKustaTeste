// api-gateway/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Optional: quick trace to be sure the request hits the gateway
  app.use('/cart', (req, _res, next) => { console.log('GW IN', req.method, req.url); next(); });
  app.use('/products', (req, _res, next) => { console.log('GW IN', req.method, req.url); next(); });

  await app.listen(Number(process.env.PORT || 3000));
}
bootstrap();
