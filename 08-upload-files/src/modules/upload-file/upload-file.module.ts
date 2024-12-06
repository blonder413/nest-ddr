import { Module } from '@nestjs/common';
import { UploadFileController } from './upload-file.controller';
import { UploadFileService } from './upload-file.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
      dest: './upload',
      limits: { fileSize: 2 * 1024 * 1024 },  // byte * kb * mb
    }),
  ],
  controllers: [UploadFileController],
  providers: [UploadFileService],
})
export class UploadFileModule {}
