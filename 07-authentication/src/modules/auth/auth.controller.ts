import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials-dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('/api/v1/auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @ApiOperation({ description: 'Loguea en la aplicación' })
  @ApiBody({
    description: 'Loguea en la aplicación usando credenciales',
    type: AuthCredentialsDto,
    examples: {
      ejemplo1: {
        value: {
          email: 'namesis@umbrela.corp',
          password: '123456',
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  @ApiResponse({ status: 201, description: 'Login realizado con éxito' })
  login(@Body() authCredentials: AuthCredentialsDto) {
    return this.authService.login(authCredentials);
  }

  @Get('data-user')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ description: 'Devuelve la información del usuario logueado' })
  @ApiBearerAuth('jwt')
  @ApiResponse({
    status: 200,
    description: 'Devuelve la información del usuario logueado',
  })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  dataUser(@Req() request) {
    return request.user;
  }
}
