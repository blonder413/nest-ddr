import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientDto } from './dto/client-dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Clientes')
@Controller('api/v1/clients')
export class ClientController {
  constructor(private clienteService: ClientService) {}

  @ApiBody({
    description: 'Crea un nuevo cliente usando un ClientDto',
    type: ClientDto,
    examples: {
      ejemplo1: {
        value: {
          name: 'jill',
          email: 'jvalentine@bsaa.org',
          address: {
            country: 'Colombia',
            province: 'Cundinamarca',
            town: 'Bogotá',
            street: 'Evergreen Terrace 7-42',
          },
        },
      },
      ejemplo2: {
        value: {
          id: 4,
          name: 'jill',
          email: 'jvalentine@bsaa.org',
          address: {
            country: 'Colombia',
            province: 'Cundinamarca',
            town: 'Bogotá',
            street: 'Evergreen Terrace 7-42',
          },
        },
      },
    },
  })
  @ApiOperation({
    description: 'Crea un cliente',
  })
  @ApiResponse({
    status: 201,
    description: 'Cliente creado correctamente',
  })
  @ApiResponse({
    status: 409,
    description: `El cliente existe<br>La dirección existe`,
  })
  @Post()
  createClient(@Body() client: ClientDto) {
    return this.clienteService.createClient(client);
  }

  @ApiOperation({
    description: 'Devuelve todos los clientes y sus direcciones',
  })
  @ApiResponse({
    status: 200,
    description: 'Se ha devuelto la información correctamente',
  })
  @Get()
  getClients() {
    return this.clienteService.getClients();
  }

  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Id del cliente',
  })
  @ApiOperation({
    description: 'Devuelve un cliente y sus dirección dado un id de cliente',
  })
  @ApiResponse({
    status: 200,
    description: 'Se ha devuelto la información correctamente',
  })
  @Get('/:id')
  getClientById(@Param('id') id: number) {
    return this.clienteService.findClientById(id);
  }

  @ApiBody({
    description: 'Actualiz un cliente usando un ClientDto',
    type: ClientDto,
    examples: {
      ejemplo1: {
        value: {
          id: 1,
          name: 'Jill Valentine',
          email: 'jvalentine@stars.gov',
          address: {
            country: 'Colombia',
            province: 'Cundinamarca',
            town: 'Bogotá',
            street: 'Evergreen Terrace 742',
          },
        },
      },
      ejemplo2: {
        value: {
          id: 1,
          name: 'Jill Valentine',
          email: 'jvalentine@stars.gov',
          address: {
            id: 1,
            country: 'Colombia',
            province: 'Cundinamarca',
            town: 'Bogotá',
            street: 'Evergreen Terrace 742',
          },
        },
      },
    },
  })
  @ApiOperation({
    description: 'Actualiza un cliente',
  })
  @ApiResponse({
    status: 200,
    description: 'Se ha actualizado correctamente',
  })
  @ApiResponse({
    status: 409,
    description: `El cliente existe<br>La dirección existe`,
  })
  @Put()
  updateClient(@Body() client: ClientDto) {
    return this.clienteService.updateClient(client);
  }

  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Id del cliente',
  })
  @ApiOperation({
    description: 'Borra un cliente y su dirección dado un id de cliente',
  })
  @ApiResponse({
    status: 200,
    description: 'Se ha borrado el cliente y su dirección correctamente',
  })
  @ApiResponse({
    status: 409,
    description: 'El cliente existe',
  })
  @Delete('/:id')
  deleteClient(@Param('id') id: number) {
    return this.clienteService.deleteClient(id);
  }
}
