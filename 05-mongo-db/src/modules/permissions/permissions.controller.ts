import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { ApiTags } from '@nestjs/swagger';
import { PermissionDto } from './dto/permission-dto';
import { UpdatePermissionDto } from './dto/permission-update.dto';

@Controller('/api/v1/permissions')
@ApiTags('Permissions')
export class PermissionsController {
  constructor(private permissionService: PermissionsService) {}

  @Post()
  createPermission(@Body() permission: PermissionDto) {
    return this.permissionService.createPermission(permission);
  }

  @Get()
  getPermission(@Query('name') name: string) {
    return this.permissionService.getPermissions(name);
  }

  @Put()
  updatePermission(@Body() updatePermission: UpdatePermissionDto) {
    return this.permissionService.updatePermission(updatePermission);
  }
}
