import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserDto } from './dto/user-dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('/api/v1/users')
@ApiTags('Users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ description: 'Crea un usuario' })
  @ApiBody({
    description: 'Crea un usuario usando UserDto',
    type: UserDto,
    examples: {
      ejemplo1: {
        value: {
          email: 'namesis@umbrela.corp',
          password: '123456',
        },
      },
    },
  })
  @ApiBearerAuth('jwt')
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 201, description: 'Usuario creado correctamente' })
  @ApiResponse({ status: 409, description: 'El usuario ya existe' })
  createUser(@Body() user: UserDto) {
    return this.userService.createUser(user);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ description: 'Devuelve todos los usuarios' })
  @ApiBearerAuth('jwt')
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({
    status: 200,
    description: 'Devuelve todos los usuarios correctamente',
  })
  get() {
    return this.userService.get();
  }
}
