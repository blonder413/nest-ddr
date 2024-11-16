import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/v1/users')
@ApiTags('users')
export class UsersController {}
