import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { json, urlencoded } from 'body-parser';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  app.enableCors();
  app.use(json({ limit: '5mb' }));
  app.use(urlencoded({ extended: true }));

  const PORT = Number(config.get('PORT') || 3000);
  const PRODUCTS = config.get('PRODUCTS_SERVICE_URL');
  const CART = config.get('CART_SERVICE_URL');


  app.use(
    '/products',
    createProxyMiddleware({
      target: PRODUCTS,
      changeOrigin: true,
      pathRewrite: { '^/products': '' }, 
    }),
  );

  app.use(
    '/cart',
    createProxyMiddleware({
      target: CART,
      changeOrigin: true,
      pathRewrite: { '^/cart': '' },
    }),
  );


  app.use(
    '/products/docs',
    createProxyMiddleware({
      target: PRODUCTS,
      changeOrigin: true,
      pathRewrite: { '^/products/docs': '/docs' },
    }),
  );
  app.use(
    '/products/api-json',
    createProxyMiddleware({
      target: PRODUCTS,
      changeOrigin: true,
      pathRewrite: { '^/products/api-json': '/api-json' },
    }),
  );

  app.use(
    '/cart/docs',
    createProxyMiddleware({
      target: CART,
      changeOrigin: true,
      pathRewrite: { '^/cart/docs': '/docs' },
    }),
  );
  app.use(
    '/cart/api-json',
    createProxyMiddleware({
      target: CART,
      changeOrigin: true,
      pathRewrite: { '^/cart/api-json': '/api-json' },
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('API Gateway')
    .setDescription('Entry point. Proxies to products and cart services.')
    .setVersion('1.0.0')
    .build();
  const doc = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/docs', app, doc);

  await app.listen(PORT);
}
bootstrap();
