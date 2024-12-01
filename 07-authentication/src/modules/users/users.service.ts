import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { UserDto } from './dto/user-dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(user: UserDto) {
    const userExists = await this.userModel.findOne({ email: user.email });

    if (userExists) {
      throw new ConflictException(
        `El usuario con email ${user.email} ya existe`,
      );
    }

    const u = new this.userModel(user);
    await u.save();
    u.password = undefined;
    return u;
  }

  async get() {
    return await this.userModel.find({}, { password: 0 });
  }
}
