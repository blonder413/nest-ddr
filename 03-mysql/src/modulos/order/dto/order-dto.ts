import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsUUID,
} from 'class-validator';
import { ClientDto } from 'src/modulos/client/dto/client-dto';
import { ProductDto } from 'src/modulos/product/dto/product-dto';

export class OrderDto {
  @ApiProperty({
    name: 'id',
    type: String,
    required: false,
    description: 'Id de la orden (UUID)',
  })
  @IsOptional()
  @IsUUID()
  id?: string;

  @ApiProperty({
    name: 'createdAt',
    type: Date,
    required: false,
    description: 'Fecha de creación',
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  createAt?: Date;

  @ApiProperty({
    name: 'updatedAt',
    type: Date,
    required: false,
    description: 'Fecha de actualización',
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  updateAt?: Date;

  @ApiProperty({
    name: 'confirmAt',
    type: Date,
    required: false,
    description: 'Fecha de confirmación',
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  confirmAt?: Date;

  @ApiProperty({
    name: 'client',
    type: ClientDto,
    required: true,
    description: 'Cliente de la orden',
  })
  @IsNotEmpty()
  @Type(() => ClientDto)
  client: ClientDto;

  @ApiProperty({
    name: 'products',
    type: ProductDto,
    isArray: true,
    required: true,
    description: 'Productos de la orden',
  })
  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @Type(() => ProductDto)
  products!: ProductDto[];
}
