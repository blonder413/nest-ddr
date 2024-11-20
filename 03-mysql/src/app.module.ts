import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './modulos/product/product.module';
import { ClientModule } from './modulos/client/client.module';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
