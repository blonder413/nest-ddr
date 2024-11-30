import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configurationMongo from './configuration/configuration-mongo';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configurationMongo],
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri:
          'mongodb://' +
          configService.get('mongo.user') +
          ':' +
          configService.get('mongo.pasword') +
          '@' +
          configService.get('mongo.host') +
          ':' +
          configService.get('mongo.port') +
          '/' +
          configService.get('mongo.database') +
          '?authSource=admin',
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
