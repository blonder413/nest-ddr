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
        filename: (req, file, cb) => {
          let filenameParts = file.originalname.split('.');
          filenameParts = filenameParts.slice(0, filenameParts.length - 1);
          const filename = filenameParts.join('.');
          if (file.mimetype) {
            const ext = file.mimetype.split('/')[1];
            cb(null, filename + '-' + Date.now() + '.' + ext);
          } else {
            cb(null, filename + '-' + Date.now());
          }
        },
      }),
    }),
  ],
  controllers: [UploadFileController],
  providers: [UploadFileService],
})
export class UploadFileModule {}
