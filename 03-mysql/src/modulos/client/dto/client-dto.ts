import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AddressDto } from './address-dto';

export class ClientDto {
  @ApiProperty({
    name: 'id',
    type: Number,
    required: false,
    description: 'Id del cliente',
  })
  @IsOptional()
  @IsPositive()
  @IsNumber()
  id?: number;

  @ApiProperty({
    name: 'name',
    type: String,
    required: true,
    description: 'Nombre del cliente',
  })
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({
    name: 'email',
    type: String,
    required: true,
    description: 'Email del cliente',
  })
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @ApiProperty({
    name: 'address',
    type: AddressDto,
    required: true,
    description: 'Dirección del cliente',
  })
  @Type(() => AddressDto)
  @IsNotEmpty()
  address!: AddressDto;
}
