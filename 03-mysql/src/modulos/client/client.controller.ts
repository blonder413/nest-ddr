import { Body, Controller, Get, Post } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientDto } from './dto/client-dto';

@Controller('api/v1/clients')
export class ClientController {
    constructor(private clienteService:ClientService){}

    @Post()
    createClient(@Body() client: ClientDto){
        return this.clienteService.createClient(client);
    }

    @Get()
    getClients(){
        return this.clienteService.getClients()
    }
}
