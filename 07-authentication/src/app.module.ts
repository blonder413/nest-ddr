import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configurationMongo from './configuration/configuration-mongo';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configurationMongo],
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
