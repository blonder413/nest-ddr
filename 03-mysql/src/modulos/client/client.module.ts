import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entity/address.entity';
import { Client } from './entity/client.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Client, Address])
  ],
  controllers: [ClientController],
  providers: [ClientService]
})
export class ClientModule {}
