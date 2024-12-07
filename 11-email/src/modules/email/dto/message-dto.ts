import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class MessageDto {
  @ApiProperty({
    name: 'body',
    required: true,
    type: String,
    description: 'Cuerpo del mensaje a enviar',
  })
  @IsString()
  @IsNotEmpty()
  body: string;

  @ApiProperty({
    name: 'subject',
    required: true,
    type: String,
    description: 'Asunto del mensaje a enviar',
  })
  @IsString()
  @IsNotEmpty()
  subject: string;

  @ApiProperty({
    name: 'receivers',
    required: true,
    isArray: true,
    type: String,
    description: 'Destinatarios del mensaje',
  })
  @IsArray()
  @IsNotEmpty()
  receivers: string[];
}
