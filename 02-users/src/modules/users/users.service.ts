import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/users-dto';

@Injectable()
export class UsersService {
  private _users: UserDto[];
  constructor() {
    this._users = [];
  }
  createUser(user: UserDto) {
    const userFound = this._users.find((u) => u.id == user.id);
    if (!userFound) {
      this._users.push(user);
      console.log(this._users);
      return true;
    }
    return false;
  }

  getUsers(start: Date, end: Date) {
    console.log(start, end);
    if (start && end) {
      return this._users.filter(
        (u) =>
          u.birthDate.getTime() >= start.getTime() &&
          u.birthDate.getTime() <= end.getTime(),
      );
    } else if (start && !end) {
      return this._users.filter(
        (u) => u.birthDate.getTime() >= start.getTime(),
      );
    } else if (!start && end) {
      return this._users.filter((u) => u.birthDate.getTime() <= end.getTime());
    } else {
      return this._users;
    }
  }
}
