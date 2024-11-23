import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://admin:123456@localhost:27017')],
  controllers: [],
  providers: [],
})
export class AppModule {}
