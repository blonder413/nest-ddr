import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserDto } from './dto/user-dto';

@Controller('/api/v1/users')
@ApiTags('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  createUser(@Body() user: UserDto) {
    return this.userService.createUser(user);
  }

  @Get()
  getUsers(){
    return this.userService.getUsers();
  }
}
