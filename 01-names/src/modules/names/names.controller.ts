import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { NamesService } from './names.service';

@Controller('api/v1/names')
export class NamesController {
  constructor(private namesService: NamesService) {}

  @Post()
  createName(@Body() data: { name: string }) {
    return this.namesService.createName(data.name);
  }

  @Get()
  getNames(@Query('start') start:string){
    return this.namesService.getNames(start);
  }
}
