import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model, Types } from 'mongoose';
import { RolesService } from '../roles/roles.service';
import { UserDto } from './dto/user-dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private roleService: RolesService,
  ) {}

  async createUser(user: UserDto) {
    const userExists = await this.userModel.findOne({ email: user.email });
    if (userExists) {
      throw new ConflictException(
        `El usuario con email ${user.email} ya existe`,
      );
    }
    let roleId: Types.ObjectId = null;
    if (user.role) {
      const roleExists = await this.roleService.findRoleByName(user.role.name);
      if (!roleExists) {
        throw new ConflictException(`El rol ${user.role.name} no existe`);
      }
      roleId = roleExists._id;
    }

    const nUsers = await this.userModel.countDocuments();

    const userCode = nUsers + 1;

    const u = new this.userModel({
      ...user,
      userCode,
      role: roleId,
    });

    return u.save();
  }
}
