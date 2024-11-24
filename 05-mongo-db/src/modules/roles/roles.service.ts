import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Role } from './schemas/role.schema';
import { Model, Types } from 'mongoose';
import { PermissionsService } from '../permissions/permissions.service';
import { RoleDto } from './dto/role-dto';
import { PermissionDto } from '../permissions/dto/permission-dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role.name) private roleModel: Model<Role>,
    private permissionService: PermissionsService,
  ) {}

  async createRole(role: RoleDto) {
    const roleExists = await this.roleModel.findOne({ name: role.name });
    if (roleExists) {
      throw new ConflictException(`El rol ${roleExists.name} ya existe`);
    }
    const permissionsRole: Types.ObjectId[] = [];
    if (role.permissions && role.permissions.length > 0) {
      for (const permission of role.permissions) {
        const permissionFound =
          await this.permissionService.findPermissionByName(permission.name);
        if (!permissionFound) {
          throw new ConflictException(
            `El permiso ${permission.name} no existe`,
          );
        }
        permissionsRole.push(permissionFound._id);
      }
    }
    const r = new this.roleModel({
      name: role.name,
      permissions: permissionsRole,
    });
    return r.save();
  }

  async getRoles(name: string) {
    const filter = {};
    if (name) {
      filter['name'] = {
        $regex: name.trim(),
        $options: 'i', // para que la consulta no sea case sensitive
      };
    }
    return this.roleModel.find(filter).populate('permissions');
  }

  async findRoleByName(name: string) {
    return await this.roleModel.findOne({ name }).populate('permissions');
  }

  async updateRole(name: string, role: RoleDto) {
    const roleExists = await this.findRoleByName(name);

    if (roleExists) {
      const newRoleExists = await this.findRoleByName(role.name);

      if (newRoleExists && newRoleExists.name != name) {
        return new ConflictException(`El rol ${newRoleExists.name} ya existe`);
      }

      const permissionsRole: Types.ObjectId[] = [];
      if (role.permissions && role.permissions.length > 0) {
        for (const permission of role.permissions) {
          const permissionFound =
            await this.permissionService.findPermissionByName(permission.name);
          if (!permissionFound) {
            throw new ConflictException(
              `El permiso ${permission.name} no existe`,
            );
          }
          permissionsRole.push(permissionFound._id);
        }
      }

      await roleExists.updateOne({
        name: role.name,
        permissions: permissionsRole,
      });
      return this.findRoleByName(role.name);
    } else {
      return this.createRole(role);
    }
  }

  async addPermision(name: string, permission: PermissionDto) {
    const roleExists = await this.findRoleByName(name);
    if (roleExists) {
      const permissionExists =
        await this.permissionService.findPermissionByName(permission.name);
      if (permissionExists) {
        const permissionRoleExist = await this.roleModel.findOne({
          name: roleExists.name,
          permissions: {
            $in: permissionExists._id,
          },
        });
        if (!permissionRoleExist) {
          await roleExists.updateOne({
            $push: {
              permissions: permissionExists._id,
            },
          });
          return this.findRoleByName(name);
        }
        throw new ConflictException('El permiso ya existe en el rol');
      }
      throw new ConflictException('El permiso no existe');
    }
    throw new ConflictException('El rol no existe');
  }

  async removePermission(name: string, permission: PermissionDto) {
    const roleExists = await this.findRoleByName(name);
    if (roleExists) {
      const permissionExists =
        await this.permissionService.findPermissionByName(permission.name);
      if (permissionExists) {
        const permissionRoleExist = await this.roleModel.findOne({
          name: roleExists.name,
          permissions: {
            $in: permissionExists._id,
          },
        });
        if (permissionRoleExist) {
          await roleExists.updateOne({
            $pull: {
              permissions: permissionExists._id,
            },
          });
          return this.findRoleByName(name);
        }
        throw new ConflictException('El permiso no existe en el rol');
      }
      throw new ConflictException('El permiso no existe');
    }
    throw new ConflictException('El rol no existe');
  }

  async destroyRole(name: string) {
    const roleExists = await this.findRoleByName(name);
    if (roleExists) {
      return roleExists.deleteOne();
    }
    throw new ConflictException('El rol no existe');
  }
}
