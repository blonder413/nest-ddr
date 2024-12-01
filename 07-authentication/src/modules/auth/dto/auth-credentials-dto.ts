import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

class AuthCredentialsDto {
  @ApiProperty({
    name: 'email',
    type: String,
    required: true,
    description: 'Email del usuario al iniciar sesión',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    name: 'password',
    type: String,
    required: true,
    description: 'Password del usuario al iniciar sesión',
  })
  @IsString()
  @IsNotEmpty()
  password!: string;
}
