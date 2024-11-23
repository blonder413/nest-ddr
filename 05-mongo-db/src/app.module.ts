import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import configuration from './configuration/configuration';
import { PermissionsModule } from './modules/permissions/permissions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      envFilePath: `./env/.env.${process.env.NODE_ENV}`,
    }),
    // MongooseModule.forRoot('mongodb://user:password@localhost:27017/database'),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        // configService hace referencia configuration/configuration.ts
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
    }),
    PermissionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
