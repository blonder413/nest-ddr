import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Permission } from './schemas/permission.schema';
import { Model } from 'mongoose';
import { PermissionDto } from './dto/permission-dto';
import { UpdatePermissionDto } from './dto/permission-update.dto';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectModel(Permission.name) private permissionModel: Model<Permission>,
  ) {}

  async createPermission(permission: PermissionDto) {
    const permissionExists = await this.findPermissionByName(permission.name);
    if (permissionExists) {
      throw new ConflictException('El permiso existe');
    }
    const p = new this.permissionModel(permission);
    return p.save();
  }

  async getPermissions(name: string) {
    const filter = {};
    if (name) {
      filter['name'] = {
        $regex: name.trim(), // toma lo que contenga el valor dado
        $options: 'i', // para que no sea case sensitive
      };
    }
    return await this.permissionModel.find(filter);
  }

  async updatePermission(updatePermission: UpdatePermissionDto) {
    const permissionExists = await this.findPermissionByName(
      updatePermission.originalName,
    );
    const newPermissionExists = await this.findPermissionByName(
      updatePermission.newName,
    );
    if (permissionExists && !newPermissionExists) {
      await permissionExists.updateOne({ name: updatePermission.newName });
      return this.permissionModel.findById(permissionExists._id);
    } else if (!permissionExists) {
      const permission = new PermissionDto();
      permission.name = updatePermission.originalName;
      return this.createPermission(permission);
    }
    throw new ConflictException('No se puede actualizar el permiso');
  }

  async deletePermission(name: string) {
    const permissionExists = await this.findPermissionByName(name);
    if (permissionExists) {
      return await permissionExists.deleteOne();
    }
    throw new ConflictException('El permiso no existe');
  }

  async findPermissionByName(name: string) {
    return await this.permissionModel.findOne({ name });
  }
}
