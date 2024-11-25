import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { RoleDto } from 'src/modules/roles/dto/role-dto';

export class UserDto {
  @ApiProperty({
    name: 'name',
    type: String,
    required: true,
    description: 'Nombre del usuario',
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    name: 'email',
    type: String,
    required: true,
    description: 'Email del usuario',
  })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({
    name: 'birthday',
    type: Date,
    required: true,
    description: 'Fecha de nacimiento del usuario',
  })
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  birthday!: Date;

  @Type(() => RoleDto)
  @ApiProperty({
    name: 'role',
    type: RoleDto,
    required: false,
    description: 'Rol del usuario',
  })
  @IsOptional()
  @IsObject()
  role?: RoleDto;
}
