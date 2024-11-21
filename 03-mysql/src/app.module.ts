import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './modulos/product/product.module';
import { ClientModule } from './modulos/client/client.module';
import { OrderModule } from './modulos/order/order.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'cursos',
      password: 'Cursos.Blonder413',
      database: 'nestddr',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ProductModule,
    ClientModule,
    OrderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
