import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Role } from './schemas/role.schema';
import { Model, Types } from 'mongoose';
import { PermissionsService } from '../permissions/permissions.service';
import { RoleDto } from './dto/role-dto';

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
}
