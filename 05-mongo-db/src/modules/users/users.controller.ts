import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserDto } from './dto/user-dto';
import { GreaterZeroPipe } from 'src/pipes/greater-zero/greater-zero.pipe';
import { UserRoleDto } from './dto/user-role-dto';

@Controller('/api/v1/users')
@ApiTags('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  @ApiOperation({ description: 'Crea un usuario' })
  @ApiBody({
    type: UserDto,
    description: 'Crea un usuario a partir de un UserDto',
    examples: {
      ejemplo1: {
        value: {
          name: 'sheva',
          email: 'salomar@bsaa.org',
          birthday: '1983-12-25',
        },
      },
      ejemplo2: {
        value: {
          name: 'sheva',
          email: 'salomar@bsaa.org',
          birthday: '1983-12-25',
          role: 'ADMIN',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Usuario creado correctamente' })
  @ApiResponse({
    status: 409,
    description: `El email ya existe<br>El rol no existe`,
  })
  createUser(@Body() user: UserDto) {
    return this.userService.createUser(user);
  }

  @Get()
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
    description: 'Página actual',
  })
  @ApiQuery({
    name: 'size',
    type: Number,
    required: false,
    description: 'Número de elementos a mostrar',
  })
  @ApiQuery({
    name: 'sortBy',
    type: String,
    required: false,
    description: 'Propiedad por la cual ordenar',
  })
  @ApiQuery({
    name: 'sort',
    type: String,
    required: false,
    description: 'Modo de ordenamiento (asc, desc)',
  })
  @ApiOperation({ description: 'Devuelve todos los usuarios' })
  @ApiResponse({ status: 200, description: 'Usuarios devueltos correctamente' })
  getUsers(
    @Query('page', GreaterZeroPipe) page: number,
    @Query('size', GreaterZeroPipe) size: number,
    @Query('sortBy') sortBy: string,
    @Query('sort') sort: string,
  ) {
    return this.userService.getUsers(page, size, sortBy, sort);
  }

  @Get('/actives')
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
    description: 'Página actual',
  })
  @ApiQuery({
    name: 'size',
    type: Number,
    required: false,
    description: 'Número de elementos a mostrar',
  })
  @ApiQuery({
    name: 'sortBy',
    type: Number,
    required: false,
    description: 'Propiedad por la que ordenar',
  })
  @ApiQuery({
    name: 'sort',
    type: String,
    required: false,
    description: 'Modo de ordenamiento (asc o desc)',
  })
  @ApiOperation({ description: 'Devuelve todos los usuarios activos' })
  @ApiResponse({ status: 200, description: 'Usuarios devueltos correctamente' })
  getUsersActives(
    @Query('page', GreaterZeroPipe) page: number,
    @Query('size', GreaterZeroPipe) size: number,
    @Query('sortBy') sortBy: string,
    @Query('sort') sort: string,
  ) {
    return this.userService.getUsers(page, size, sortBy, sort, false);
  }

  @Get('/deleted')
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
    description: 'Página actual',
  })
  @ApiQuery({
    name: 'size',
    type: Number,
    required: false,
    description: 'Número de elementos a mostrar',
  })
  @ApiQuery({
    name: 'sortBy',
    type: Number,
    required: false,
    description: 'Propiedad por la que ordenar',
  })
  @ApiQuery({
    name: 'sort',
    type: String,
    required: false,
    description: 'Modo de ordenamiento (asc o desc)',
  })
  @ApiOperation({ description: 'Devuelve todos los usuarios borrados' })
  @ApiResponse({ status: 200, description: 'Usuarios devueltos correctamente' })
  getUsersDeleted(
    @Query('page', GreaterZeroPipe) page: number,
    @Query('size', GreaterZeroPipe) size: number,
    @Query('sortBy') sortBy: string,
    @Query('sort') sort: string,
  ) {
    return this.userService.getUsers(page, size, sortBy, sort, true);
  }

  @Put('/:usercode')
  @ApiOperation({ description: 'Actualiza un usuario' })
  @ApiParam({
    name: 'usercode',
    type: Number,
    required: true,
    description: 'Código del usuario',
  })
  @ApiBody({
    type: UserDto,
    description: '',
    examples: {
      ejemplo1: {
        value: {
          name: 'christopher',
          email: 'bburton@bsaa.org',
          birthday: '1980-08-12',
        },
      },
      ejemplo2: {
        value: {
          name: 'christopher',
          email: 'bburton@bsaa.org',
          birthday: '1980-08-12',
          role: {
            name: 'VISITANTE',
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Usuario actualizado correctamente',
  })
  @ApiResponse({
    status: 409,
    description: `El email ya existe<br>El rol no existe`,
  })
  updateUser(@Param('usercode') userCode: number, @Body() user: UserDto) {
    return this.userService.updateUser(userCode, user);
  }

  @Patch('/add-role')
  @ApiOperation({ description: 'Añade un rol a un usuario' })
  @ApiBody({
    type: UserRoleDto,
    description: 'Añade un rol a un usuario mediente un UserRoleDto',
    examples: {
      ejemplo1: {
        value: {
          userCode: 8,
          roleName: 'AUDITOR',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Rol añadido correctamente al usuario',
  })
  @ApiResponse({
    status: 409,
    description: `El usuario ya tiene rol<br>El rol no existe<br>El usuario no existe`,
  })
  addRole(@Body() userRole: UserRoleDto) {
    return this.userService.addRole(userRole);
  }

  @Patch('/remove-role/:usercode')
  @ApiOperation({ description: 'Elimina un rol de un usuario' })
  @ApiParam({
    name: 'usercode',
    type: Number,
    required: true,
    description: 'Código del usuario que vamos a eliminar el rol',
  })
  @ApiResponse({ status: 200, description: 'Rol eliminado del usuario' })
  @ApiResponse({
    status: 409,
    description: `El rol no existe<br>El usuario no existe`,
  })
  removeRole(@Param('usercode') userCode: number) {
    return this.userService.removeRole(userCode);
  }

  @Patch('/restore/:usercode')
  @ApiOperation({ description: 'Restaura un usuario' })
  @ApiParam({
    name: 'userCode',
    type: Number,
    required: true,
    description: 'Código del usuario que vamos a restaurar',
  })
  @ApiResponse({ status: 200, description: 'Usuario restaurado' })
  @ApiResponse({
    status: 409,
    description: `El usuario no está borrado<br>El usuario no existe`,
  })
  restoreUser(@Param('usercode') userCode: number) {
    return this.userService.restoreUser(userCode);
  }

  @Delete('/:usercode')
  @ApiOperation({ description: 'Elimina un usuario' })
  @ApiParam({
    name: 'usercode',
    type: Number,
    required: true,
    description: 'Código del usuario que vamos a elimnar',
  })
  @ApiResponse({ status: 200, description: 'Usuario borrado' })
  @ApiResponse({
    status: 409,
    description: `El usuario ya está borrado<br>El usuario no existe`,
  })
  deleteUser(@Param('usercode') userCode: number) {
    return this.userService.deleteUser(userCode);
  }
}
