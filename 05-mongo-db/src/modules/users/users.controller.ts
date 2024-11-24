import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';

@Controller('/api/v1/users')
@ApiTags('users')
export class UsersController {
  constructor(private userService: UsersService) {}
}
