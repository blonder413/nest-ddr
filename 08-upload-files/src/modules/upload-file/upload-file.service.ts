import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadFileService {
  constructor() {}

  uploadFile(file: Express.Multer.File) {
    if (file) {
      return { originalName: file.originalname, filename: file.filename };
    }
    return null;
  }
}
