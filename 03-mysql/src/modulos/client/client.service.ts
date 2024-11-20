import { ConflictException, Injectable } from '@nestjs/common';
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

  async createClient(client: ClientDto) {
    const clientExist = await this.findClient(client);
    if (clientExist) {
      if (client.id) {
        throw new ConflictException(`El cliente con id ${client.id} ya existe`);
      } else {
        throw new ConflictException(
          `El cliente con email ${client.email} ya existe`,
        );
      }
    }
    return this.clientsRepository.save(client);
  }

  findClient(client: ClientDto) {
    return this.clientsRepository.findOne({
      where: [{ id: client.id }, { email: client.email }], // OR
    });
  }
}
