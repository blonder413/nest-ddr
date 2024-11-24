import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Permission } from './schemas/permission.schema';
import { Model } from 'mongoose';
import { PermissionDto } from './dto/permission-dto';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectModel(Permission.name) private permissionModel: Model<Permission>,
  ) {}

  async createPermission(permission: PermissionDto) {
    const permissionExists = await this.permissionModel.findOne({
      name: permission.name,
    });
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
}
