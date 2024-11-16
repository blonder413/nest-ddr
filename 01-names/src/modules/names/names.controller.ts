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
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

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
  @ApiQuery({
    name: 'start',
    type: 'string',
    required: false,
    description: 'letras por las que inicia el nombre',
  })
  getNames(@Query('start') start: string) {
    return this.namesService.getNames(start);
  }

  @Put('/:name/:newName')
  @ApiOperation({
    description: 'Actualiza un nuevo nombre',
  })
  @ApiParam({
    name: 'name',
    type: 'string',
    description: 'nombre original',
  })
  @ApiParam({
    name: 'newName',
    type: 'string',
    description: 'nuevo nombre',
  })
  updateName(@Param('name') name: string, @Param('newName') newName: string) {
    return this.namesService.updateName(name, newName);
  }

  @Delete('clear')
  @ApiOperation({
    description: 'Elimina todos los nombres',
  })
  clearNames() {
    return this.namesService.clearNames();
  }

  @Delete('/:name')
  @ApiParam({
    name: 'name',
    type: 'string',
    description: 'nombre a eliminar',
  })
  @ApiOperation({
    description: 'Elimina el nombre dado',
  })
  deleteName(@Param('name') name: string) {
    return this.namesService.deleteName(name);
  }
}
