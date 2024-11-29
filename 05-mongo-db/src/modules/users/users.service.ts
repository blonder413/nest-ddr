import { ConflictException, Injectable, Type } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { model, Model, Types } from 'mongoose';
import { RolesService } from '../roles/roles.service';
import { UserDto } from './dto/user-dto';
import path from 'path';
import { UserRoleDto } from './dto/user-role-dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private roleService: RolesService,
  ) {}

  async createUser(user: UserDto) {
    const userExists = await this.findUserByEmail(user.email);
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

    await u.save();
    return this.findUserByEmail(user.email);
  }

  findUserByEmail(email: string) {
    return this.userModel.findOne({ email }).populate({
      path: 'role',
      populate: { path: 'permissions', model: 'Permission' },
    });
  }

  findByUserCode(userCode: number) {
    return this.userModel.findOne({ userCode }).populate({
      path: 'role',
      populate: { path: 'permissions', model: 'Permission' },
    });
  }

  async getUsers(
    page: number,
    size: number,
    sortBy: string,
    sort: string,
    deleted?: boolean,
  ) {
    const findOptions = {};
    if (deleted != undefined) {
      findOptions['deleted'] = deleted;
    }
    const skip = (page - 1) * size;
    const total = await this.userModel.countDocuments(findOptions);
    const totalPages = Math.ceil(total / size);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1 && page <= totalPages;
    const nextPage = hasNextPage ? page + 1 : null;
    const prevPage = hasPrevPage ? page - 1 : null;

    const sortOptions = {};
    if (sortBy && sort) {
      switch (sort.toUpperCase()) {
        case 'ASC':
          sortOptions[sortBy] = 1;
          break;
        case 'DESC':
          sortOptions[sortBy] = -1;
      }
    } else if (sortBy) {
      sortOptions[sortBy] = 1;
    }

    const users: User[] = await this.userModel
      .find(findOptions)
      .sort(sortOptions)
      .skip(skip)
      .limit(size)
      .populate({
        path: 'role',
        populate: { path: 'permissions', model: 'Permission' },
      });
    return {
      content: users,
      page,
      size,
      total,
      totalPages,
      hasNextPage,
      hasPrevPage,
      nextPage,
      prevPage,
    };
  }

  async updateUser(userCode: number, user: UserDto) {
    const userExists = await this.findByUserCode(userCode);
    if (userExists) {
      if (userExists.email != user.email) {
        const emailExists = await this.findUserByEmail(user.email);
        if (emailExists) {
          throw new ConflictException(`El email ${user.email} ya existe`);
        }
      }

      let roleId: Types.ObjectId = null;
      if (user.role) {
        const roleExists = await this.roleService.findRoleByName(
          user.role.name,
        );
        if (!roleExists) {
          throw new ConflictException(`El rol ${user.role.name} no existe`);
        } else {
          roleId = roleExists._id;
        }
      }

      await userExists.updateOne({ ...user, role: roleId });
      return this.findByUserCode(userCode);
    } else {
      return this.createUser(user);
    }
  }

  async addRole(userRole: UserRoleDto) {
    const userExists = await this.findByUserCode(userRole.userCode);
    if (userExists) {
      if (userExists.role) {
        throw new ConflictException(
          `El usuario con el userCode ${userRole.userCode} ya tiene rol`,
        );
      }
      const roleExists = await this.roleService.findRoleByName(
        userRole.roleName,
      );

      if (!roleExists) {
        throw new ConflictException(`El rol ${userRole.roleName} no existe`);
      }
      await userExists.updateOne({ role: roleExists._id });
      return this.findByUserCode(userRole.userCode);
    } else {
      throw new ConflictException(
        `El usuario con el userCode ${userRole.userCode} no existe`,
      );
    }
  }

  async removeRole(userCode: number) {
    const userExists = await this.findByUserCode(userCode);
    if (!userExists) {
      throw new ConflictException(
        `El usuario con el userCode ${userCode} no existe`,
      );
    }

    if (!userExists.role) {
      throw new ConflictException(
        `El usuario con el userCode ${userCode} no tiene un rol`,
      );
    }

    await userExists.updateOne({ role: null });
    return this.findByUserCode(userCode);
  }

  async restoreUser(userCode: number) {
    const userExists = await this.findByUserCode(userCode);
    if (!userExists) {
      throw new ConflictException(
        `El usuario con el userCode ${userCode} no existe`,
      );
    }

    if (!userExists.deleted) {
      throw new ConflictException(
        `El usuario con userCode ${userCode} no se encuentra eliminado`,
      );
    }
    await userExists.updateOne({ deleted: false });
    return this.findByUserCode(userCode);
  }

  async deleteUser(userCode: number) {
    const userExists = await this.findByUserCode(userCode);
    if (!userExists) {
      throw new ConflictException(
        `El usuario con el userCode ${userCode} no existe`,
      );
    }

    if (userExists.deleted) {
      throw new ConflictException(
        `El usuario con userCode ${userCode} ya está borrado`,
      );
    }

    await userExists.updateOne({ deleted: true });
    return this.findByUserCode(userCode);
  }
}
