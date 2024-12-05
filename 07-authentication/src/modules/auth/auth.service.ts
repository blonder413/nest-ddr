import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthCredentialsDto } from './dto/auth-credentials-dto';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './dto/jwt-payload';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

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

  async login(authCredentials: AuthCredentialsDto) {
    const user = await this.validateUser(authCredentials);
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    const payload: JwtPayload = {
      email: user.email,
    };

    return { accessToken: this.jwtService.sign(payload) };
  }
}
