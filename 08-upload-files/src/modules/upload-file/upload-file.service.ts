import { ConflictException, Injectable } from '@nestjs/common';
import { existsSync } from 'fs';

@Injectable()
export class UploadFileService {
  constructor() {}

  uploadFile(file: Express.Multer.File) {
    if (file) {
      return { originalName: file.originalname, filename: file.filename };
    }
    return null;
  }

  download(res, filename: string) {
    const ruta = `./upload/${filename}`;
    if (existsSync(ruta)) {
      return res.download(ruta);
    }
    throw new ConflictException(`El archivo ${filename} no existe`);
  }
}
