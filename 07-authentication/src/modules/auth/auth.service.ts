import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthCredentialsDto } from './dto/auth-credentials-dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async validateUser(userCredencials: AuthCredentialsDto) {
    const user = await this.userService.getUserByEmail(userCredencials.email);
    if (user) {
      const passwordOk = await bcrypt.compare(
        userCredencials.password,
        user.password,
      );
      if (passwordOk) {
        return user;
      }
    }
    return null;
  }
}
