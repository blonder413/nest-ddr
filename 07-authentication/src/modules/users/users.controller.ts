import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserDto } from './dto/user-dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('/api/v1/users')
@ApiTags('Users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  createUser(@Body() user: UserDto) {
    return this.userService.createUser(user);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  get() {
    return this.userService.get();
  }
}
