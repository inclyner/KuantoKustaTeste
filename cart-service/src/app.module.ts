import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartModule } from './cart/cart.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST || process.env.DB_HOST || 'localhost',
      port: Number(process.env.POSTGRES_PORT || process.env.DB_PORT || 5432),
      username: process.env.POSTGRES_USER || process.env.DB_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD || process.env.DB_PASS || 'postgres',
      database: process.env.POSTGRES_DB || process.env.DB_NAME || 'cart',
      autoLoadEntities: true,
      synchronize: true,
  }),
  CartModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
