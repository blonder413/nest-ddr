import { Controller, Get, Param, Put } from '@nestjs/common';
import { CronService } from './cron.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('api/v1/cron')
@ApiTags('cron')
export class CronController {
  constructor(private cronService: CronService) {}

  @Get()
  @ApiOperation({ description: 'Obtiene el nombre de todos los cron' })
  @ApiResponse({ status: 200, description: 'Devuelve todos los crons' })
  getNamesCrons() {
    return this.cronService.getNamesCrones();
  }

  @Put('/desactivate/:name')
  @ApiOperation({ description: 'Desactiva un cron' })
  @ApiParam({
    name: 'name',
    type: String,
    required: true,
    description: 'Nombre del cron a desactivar',
  })
  @ApiResponse({ status: 200, description: 'Cron desactivado correctamente' })
  @ApiResponse({ status: 409, description: 'Cron no existe' })
  desactivateCron(@Param('name') name: string) {
    return this.cronService.desactivateCron(name);
  }

  @Put('/activate/:name')
  @ApiOperation({ description: 'Activa un cron' })
  @ApiParam({
    name: 'name',
    type: String,
    required: true,
    description: 'Nombre del cron a activar',
  })
  @ApiResponse({ status: 200, description: 'Cron activado correctamente' })
  @ApiResponse({ status: 409, description: 'El cron no existe' })
  activateCron(@Param('name') name: string) {
    return this.cronService.activateCron(name);
  }

  @Put('/activate-all')
  @ApiOperation({ description: 'Activa todos los crons' })
  @ApiResponse({ status: 200, description: 'Crons activados correctamente' })
  activateAll() {
    return this.cronService.activateAll();
  }

  @Put('/desactivate-all')
  @ApiOperation({ description: 'Desactiva todos los crond' })
  @ApiResponse({ status: 200, description: 'Crons desactivados correctamente' })
  desactivateAll() {
    return this.cronService.desactivateAll();
  }
}
