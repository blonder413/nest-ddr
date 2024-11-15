import { Module } from '@nestjs/common';
import { NamesModule } from './modules/names/names.module';

@Module({
  imports: [NamesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
