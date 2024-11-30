import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
  @ApiProperty({
    name: 'email',
    type: String,
    required: true,
    description: 'Email del usuario',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    name: 'password',
    type: String,
    required: true,
    description: 'Password del usuario',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
