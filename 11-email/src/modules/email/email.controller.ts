import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EmailService } from './email.service';
import { MessageDto } from './dto/message-dto';

@Controller('api/v1/email')
@ApiTags('Emails')
export class EmailController {
  constructor(private emailService: EmailService) {}

  @Post('send-email')
  @ApiOperation({ description: 'Envía un email' })
  @ApiBody({
    description: 'Envía un email usando un MessageDto',
    type: MessageDto,
    examples: {
      ejemplo1: {
        value: {
          subject: 'Prueba nestjs',
          body: '<h2>Prueba desde nestjs</h2>',
          receivers: [
            {
              email: 'jvalentine@bsaa.org',
            },
            {
              email: 'credfield@terrasave.org',
            },
          ],
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Correo enviado correctamente' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  sendEmail(@Body() message: MessageDto) {
    return this.emailService.sendEmail(message);
  }
}
