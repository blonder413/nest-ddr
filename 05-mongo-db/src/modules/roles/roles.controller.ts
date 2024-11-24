import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RolesService } from './roles.service';
import { RoleDto } from './dto/role-dto';
import { PermissionDto } from '../permissions/dto/permission-dto';

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

  @Put('/:name')
  updateRole(@Param('name') name: string, @Body() role: RoleDto) {
    return this.rolesService.updateRole(name, role);
  }

  @Patch('/add-permission/:name')
  addPermission(
    @Param('name') name: string,
    @Body() permission: PermissionDto,
  ) {
    return this.rolesService.addPermision(name, permission);
  }
}
