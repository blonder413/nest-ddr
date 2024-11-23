import { Controller } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('/api/v1/permissions')
@ApiTags('Permissions')
export class PermissionsController {
  constructor(private permissionService: PermissionsService) {}
}
