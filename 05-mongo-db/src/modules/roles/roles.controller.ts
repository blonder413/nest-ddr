import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RolesService } from './roles.service';
import { RoleDto } from './dto/role-dto';

@Controller('api/v1/roles')
@ApiTags('Roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Post()
  createRole(@Body() role: RoleDto) {
    return this.rolesService.createRole(role);
  }

  @Get()
  getRoles(@Query('name') name: string) {
    return this.rolesService.getRoles(name);
  }
}
