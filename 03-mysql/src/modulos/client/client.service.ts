import { Injectable } from '@nestjs/common';
import { ClientDto } from './dto/client-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entity/client.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private clientsRepository: Repository<Client>,
  ) {}

  createClient(client: ClientDto) {
    return this.clientsRepository.save(client);
  }
}
