import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class AddressDto {
  @ApiProperty({
    name: 'id',
    type: Number,
    required: false,
    description: 'Id',
  })
  @IsOptional()
  @IsPositive()
  @IsNumber()
  id?: number;

  @ApiProperty({
    name: 'country',
    type: String,
    required: true,
    description: 'País',
  })
  @IsNotEmpty()
  @IsString()
  country!: string;

  @ApiProperty({
    name: 'province',
    type: String,
    required: true,
    description: 'Provincia',
  })
  @IsNotEmpty()
  @IsString()
  province!: string;

  @ApiProperty({
    name: 'town',
    type: String,
    required: true,
    description: 'Ciudad',
  })
  @IsNotEmpty()
  @IsString()
  town!: string;

  @ApiProperty({
    name: 'country',
    type: String,
    required: true,
    description: 'Calle',
  })
  @IsNotEmpty()
  @IsString()
  street!: string;
}
