import { Module } from '@nestjs/common';
import { NamesController } from './names.controller';

@Module({
  imports: [],
  controllers: [NamesController],
})
export class NamesModule {}
