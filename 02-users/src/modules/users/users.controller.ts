import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserDto } from './dto/users-dto';
import { ParseDatePipe } from 'src/pipes/parse-date/parse-date.pipe';

@Controller('api/v1/users')
@ApiTags('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiBody({
    description: 'Crea un usuario en un arreglo',
    type: UserDto,
    examples: {
      ejemplo1: {
        value: {
          "id": 1,
          "nombre": 'jill valentine',
          "email": 'jvalentine@bsaa.org',
          "birthDate": '1974-04-13',
        },
      },
    },
  })
  @ApiOperation({
    description: 'Crea un usuario',
  })
  @Post()
  createUser(@Body() user: UserDto) {
    return this.userService.createUser(user);
  }

  @ApiOperation({
    description: 'devuelve los usuarios buscando por su fecha de nacimiento',
  })
  @ApiQuery({
    name: 'start',
    required: false,
    type: Date,
    description:
      'si se proporciona devuelve los usuarios con fecha de nacimiento mayor a la dada',
  })
  @ApiQuery({
    name: 'end',
    required: false,
    type: Date,
    description:
      'si se proporciona devuelve los usuarios con fecha de nacimiento menor a la dada',
  })
  @Get()
  getUsers(
    @Query('start', ParseDatePipe) start: Date,
    @Query('end', ParseDatePipe) end: Date,
  ) {
    return this.userService.getUsers(start, end);
  }

  @ApiBody({
    description: 'edita un índice en un arreglo',
    type: UserDto,
    examples: {
      ejemplo1: {
        value: {
          "id": 1,
          "nombre": 'jill valentine',
          "email": 'jvalentine@bsaa.org',
          "birthDate": '1974-04-13',
        },
      },
    },
  })
  @ApiOperation({
    description:
      'Actualiza un usuario, si el id proporcionado no existe crea un nuevo usuario',
  })
  @Put()
  updateUser(@Body() user: UserDto) {
    return this.userService.updateUser(user);
  }

  @ApiOperation({
    description: 'Elimina un elemento del arreglo de usuario',
  })
  @ApiParam({
    name: 'idUser',
    type: Number,
    description: 'Id del usario a borrar',
  })
  @Delete('/:idUser')
  deleteUser(@Param('idUser') idUser: number) {
    return this.userService.deleteUser(idUser);
  }
}
