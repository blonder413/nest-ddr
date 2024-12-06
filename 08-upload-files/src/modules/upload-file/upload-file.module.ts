import { Module } from '@nestjs/common';
import { UploadFileController } from './upload-file.controller';
import { UploadFileService } from './upload-file.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [MulterModule],
  controllers: [UploadFileController],
  providers: [UploadFileService],
})
export class UploadFileModule {}
