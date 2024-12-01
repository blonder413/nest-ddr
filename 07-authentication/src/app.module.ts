import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configurationMongo from './configuration/configuration-mongo';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import configurationAuth from './configuration/configuration-auth';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configurationMongo, configurationAuth],
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
          configService.get('mongo.password') +
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
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
