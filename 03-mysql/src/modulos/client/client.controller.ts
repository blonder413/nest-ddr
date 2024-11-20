import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientDto } from './dto/client-dto';

@Controller('api/v1/clients')
export class ClientController {
  constructor(private clienteService: ClientService) {}

  @Post()
  createClient(@Body() client: ClientDto) {
    return this.clienteService.createClient(client);
  }

  @Get()
  getClients() {
    return this.clienteService.getClients();
  }

  @Get('/:id')
  getClientById(@Param('id') id: number) {
    return this.clienteService.findClientById(id);
  }

  @Put()
  updateClient(@Body() client: ClientDto) {
    return this.clienteService.updateClient(client);
  }
}
