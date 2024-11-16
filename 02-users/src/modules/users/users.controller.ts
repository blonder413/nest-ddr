import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserDto } from './dto/users-dto';
import { ParseDatePipe } from 'src/pipes/parse-date/parse-date.pipe';

@Controller('api/v1/users')
@ApiTags('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  createUser(@Body() user: UserDto) {
    return this.userService.createUser(user);
  }

  @Get()
  getUsers(
    @Query('start', ParseDatePipe) start: Date,
    @Query('end', ParseDatePipe) end: Date,
  ) {
    return this.userService.getUsers(start, end);
  }

  @Put()
  updateUser(@Body() user: UserDto) {
    return this.userService.updateUser(user);
  }
}
