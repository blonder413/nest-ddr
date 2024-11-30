import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configurationMongo from './configuration/configuration-mongo';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';

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
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
