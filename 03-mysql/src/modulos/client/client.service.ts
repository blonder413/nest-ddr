import { ConflictException, Injectable } from '@nestjs/common';
import { ClientDto } from './dto/client-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entity/client.entity';
import { Repository } from 'typeorm';
import { Address } from './entity/address.entity';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private clientsRepository: Repository<Client>,

    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
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

    let addressExists: Address = null;
    if (client.address.id) {
      addressExists = await this.addressRepository.findOne({
        where: { id: client.address.id },
      });
    } else {
      addressExists = await this.addressRepository.findOne({
        where: {
          country: client.address.country,
          province: client.address.province,
          town: client.address.town,
          street: client.address.street,
        },
      });
    }

    if (addressExists) {
      throw new ConflictException('La dirección ya existe');
    }

    return this.clientsRepository.save(client);
  }

  async getClients() {
    return this.clientsRepository.find();
  }

  async findClientById(id: number) {
    return await this.clientsRepository.findOne({ where: { id } });
  }

  findClient(client: ClientDto) {
    return this.clientsRepository.findOne({
      where: [{ id: client.id }, { email: client.email }], // OR
    });
  }

  findClientByEmail(email: string) {
    return this.clientsRepository.findOne({ where: { email } });
  }

  async updateClient(client: ClientDto) {
    if (!client.id) {
      return this.createClient(client);
    }
    
    let clientExist = await this.findClientByEmail(client.email);
    if (clientExist && clientExist.id!=client.id) {
      throw new ConflictException(`El cliente con el email ${client.email} existe`)
    }

    let addressExists:Address = null;
    let deleteAddress = false;

    if (client.address.id) {
      // addressExists = await this.addressRepository.findOne({where:{id:client.address.id}})
    } else {
      addressExists = await this.addressRepository.findOne({
        where: {
          country: client.address.country,
          province: client.address.province,
          town: client.address.town,
          street: client.address.street
        }
      });
      if (addressExists) {
        throw new ConflictException("La dirección ya existe");
      } else {
        deleteAddress = true;
      }
    }

    return await this.clientsRepository.save(client);
  }
}
