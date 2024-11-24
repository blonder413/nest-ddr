import { Body, Controller, Get, Post } from '@nestjs/common';
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
  getRoles() {
    return this.rolesService.getRoles();
  }
}
