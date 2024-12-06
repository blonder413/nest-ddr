import { ConflictException, Module } from '@nestjs/common';
import { UploadFileController } from './upload-file.controller';
import { UploadFileService } from './upload-file.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
  imports: [
    MulterModule.register({
      /** dest: './upload',*/
      limits: { fileSize: 2 * 1024 * 1024 }, // byte * kb * mb
      fileFilter: (req, file, callback) => {
        /** if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) { */
        if (!RegExp(/\.(jpg|jpeg|png|gif)$/).exec(file.originalname)) {
          callback(new ConflictException('Solo se permiten imágenes'), false);
        }
        callback(null, true);
      },
      storage: diskStorage({
        destination: (req, file, callback) => {
          callback(null, './upload');
        },
      }),
    }),
  ],
  controllers: [UploadFileController],
  providers: [UploadFileService],
})
export class UploadFileModule {}
