import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserDto } from './dto/user-dto';
import { GreaterZeroPipe } from 'src/pipes/greater-zero/greater-zero.pipe';

@Controller('/api/v1/users')
@ApiTags('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  createUser(@Body() user: UserDto) {
    return this.userService.createUser(user);
  }

  @Get()
  getUsers(
    @Query('page', GreaterZeroPipe) page: number,
    @Query('size', GreaterZeroPipe) size: number,
    @Query('sortBy') sortBy: string,
    @Query('sort') sort: string,
  ) {
    return this.userService.getUsers(page, size, sortBy, sort);
  }

  @Put('/:usercode')
  updateUser(@Param('usercode') userCode: number, @Body() user: UserDto) {
    return this.userService.updateUser(userCode, user);
  }
}
