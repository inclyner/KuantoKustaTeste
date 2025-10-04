// api-gateway/src/app.module.ts
import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { createProxyMiddleware as proxy } from 'http-proxy-middleware';

@Module({
  imports: [],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    const CART = process.env.CART_SERVICE_URL || 'http://cart-service:3002';
    const PROD = process.env.PRODUCTS_SERVICE_URL || 'http://products-service:3001';

    consumer
      .apply(
        proxy({
          target: CART,
          changeOrigin: true,
          xfwd: true,
        }),
      )
      .forRoutes({ path: 'cart/(.*)', method: RequestMethod.ALL });

    consumer
      .apply(
        proxy({
          target: PROD,
          changeOrigin: true,
          xfwd: true,
        }),
      )
      .forRoutes({ path: 'products/(.*)', method: RequestMethod.ALL });
  }
}
