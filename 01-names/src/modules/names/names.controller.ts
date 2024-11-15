import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { NamesService } from './names.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('api/v1/names')
@ApiTags('names')
export class NamesController {
  constructor(private namesService: NamesService) {}

  @Post()
  @ApiOperation({
    description:
      'Crea un nuevo nombre. Retorna true si se inserta correctamente',
  })
  createName(@Body() data: { name: string }) {
    return this.namesService.createName(data.name);
  }

  @Get()
  @ApiOperation({
    description:
      'Devuelve todos los nombres que inician con una cadena de texto dadaa',
  })
  getNames(@Query('start') start: string) {
    return this.namesService.getNames(start);
  }

  @Put('/:name/:newName')

  @ApiOperation({
    description:
      'Actualiza un nuevo nombre',
  })
  updateName(@Param('name') name: string, @Param('newName') newName: string) {
    return this.namesService.updateName(name, newName);
  }

  @Delete('clear')

  @ApiOperation({
    description:
      'Elimina todos los nombres',
  })
  clearNames() {
    return this.namesService.clearNames();
  }

  @Delete('/:name')

  @ApiOperation({
    description:
      'Elimina el nombre dado',
  })
  deleteName(@Param('name') name: string) {
    return this.namesService.deleteName(name);
  }
}
